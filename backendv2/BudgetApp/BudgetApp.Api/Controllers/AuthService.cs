using BudgetApp.Application.Features.Auth.Commands.Login;
using BudgetApp.Application.Features.Auth.Commands.Register;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BudgetApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthService : Controller
    {
        private readonly IMediator _mediator;

        public AuthService(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterCommand request)
        {
            var userId = await _mediator.Send(request);
            return Ok(new { UserId = userId });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginCommand request)
        {
            // Implement login logic here
            var token = await _mediator.Send(request);
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTimeOffset.UtcNow.AddHours(1)
            };

            Response.Cookies.Append("AuthToken", token, cookieOptions);

            return Ok(new {Message = "Zalogowano pomyślnie"});

        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            
            Response.Cookies.Delete("AuthToken", new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict
            });

            return Ok(new { Message = "Wylogowano pomyślnie" });
        }
    }
}
