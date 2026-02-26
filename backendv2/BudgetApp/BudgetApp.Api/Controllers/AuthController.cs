using BudgetApp.Application.Features.Auth.Commands.Login;
using BudgetApp.Application.Features.Auth.Commands.Register;
using BudgetApp.Application.Features.Auth.Queries.CurrentUser;
using BudgetApp.Application.Features.Auth.Queries.GetAllUsers;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BudgetApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly IMediator _mediator;
        private readonly IWebHostEnvironment _env;

        public AuthController(IMediator mediator, IWebHostEnvironment env)
        {
            _mediator = mediator;
            _env = env;
        }

        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> GetCurrentUser()
        {
           
            var user = await _mediator.Send(new GetCurrentUserQuery());
            return Ok(user);
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _mediator.Send(new GetAllUsersQuery());
            return Ok(users);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterCommand request)
        {
            var userId = await _mediator.Send(request);
            if (!userId.IsSuccess)
            {
                return BadRequest(new { message = userId.Error });
            }
            return Ok(userId);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginCommand request)
        {
            // Implement login logic here
            var result = await _mediator.Send(new LoginCommand(request.Email,request.Password));

            if (!result.IsSuccess)
            {
                return Unauthorized(new { message = result.Error });
            }

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                //SameSite = SameSiteMode.Strict,
                SameSite = _env.IsDevelopment() ? SameSiteMode.None : SameSiteMode.Strict,
                Expires = DateTimeOffset.UtcNow.AddHours(1)
            };

            Response.Cookies.Append("AuthToken", result.Data, cookieOptions);

            return Ok(new {message = "Zalogowano pomyślnie"});

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
