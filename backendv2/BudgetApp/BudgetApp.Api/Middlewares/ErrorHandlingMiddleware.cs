using BudgetApp.Domain.Expectations;
using FluentValidation;
using System.Net;
using System.Text.Json;

namespace BudgetApp.Api.Middlewares
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ErrorHandlingMiddleware> _logger;

        public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
           

        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var code = StatusCodes.Status500InternalServerError;
            var result = string.Empty;
            switch (exception)
            {
                case ValidationException validationException:
                    code = StatusCodes.Status400BadRequest;
                    // Zwracamy listę błędów, a nie tylko jeden komunikat
                    result = JsonSerializer.Serialize(new
                    {
                        error = "Validation error",
                        details = validationException.Errors.Select(e => e.ErrorMessage)
                    });
                    break;
                case NotFoundException notFoundException:
                    code = (int)HttpStatusCode.NotFound; // 404
                    result = JsonSerializer.Serialize(new { error = notFoundException.Message });
                    break;
                case BadRequestException badRequestException:
                    code = (int)HttpStatusCode.BadRequest; // 400
                    result = JsonSerializer.Serialize(new { error = badRequestException.Message });
                    break;

                case UnauthorizedAccessException :
                case UnauthorizedException:
                    code = (int)HttpStatusCode.Unauthorized; // 401
                    result = JsonSerializer.Serialize(new { error = exception.Message });
                    break;

                case ForbiddenException forbiddenException:
                    code = (int)HttpStatusCode.Forbidden; // 403
                    result = JsonSerializer.Serialize(new { error = forbiddenException.Message });
                    break;

                case Exception e:
                    _logger.LogError(e, "Something went wrong");
                    result = JsonSerializer.Serialize(new { error = "An error occurred while processing your request." });
                    break;
            }
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)code;

            return context.Response.WriteAsync(result);
        }

    }
}