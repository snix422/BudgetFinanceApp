using BudgetApp.Application.DTOs;
using BudgetApp.Application.Features.Budgets.Commands.CreateBudget;
using BudgetApp.Application.Features.Budgets.Commands.DeleteBudget;
using BudgetApp.Application.Features.Budgets.Commands.GenerateBudgetShareToken;
using BudgetApp.Application.Features.Budgets.Commands.RevokeShareToken;
using BudgetApp.Application.Features.Budgets.Commands.UpdateBudget;
using BudgetApp.Application.Features.Budgets.Queries.ExportBudget;
using BudgetApp.Application.Features.Budgets.Queries.GetAllBudgets;
using BudgetApp.Application.Features.Budgets.Queries.GetBudgetById;
using BudgetApp.Application.Features.Budgets.Queries.GetBudgetsByUser;
using BudgetWebApi.Domain.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BudgetApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BudgetsController : Controller
    {

        private readonly IMediator _mediator;

        public BudgetsController(IMediator mediator)
        {

            _mediator = mediator;
        }

        [HttpGet("admin/all")]
        public async Task<ActionResult<IEnumerable<Budget>>> GetAllBudgets()
        {
            var budgets = await _mediator.Send(new GetAllBudgetsQuery());
            return Ok(budgets);
        }



        [HttpGet("{id}")]
        public async Task<ActionResult<Budget>> GetBudgetById(int id)
        {
            var budget = await _mediator.Send(new GetBudgetByIdQuery(id));
            return Ok(budget);

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Budget>>> GetBudgetsByUser()
        {
            var budgets = await _mediator.Send(new GetBudgetsByUserQuery());
            return Ok(budgets);
        }

        [HttpPost]
        public async Task<IActionResult> CreateBudget([FromBody] CreateBudgetDTO request)
        {
            var newBudget = new CreateBudgetCommand
            {
                Title = request.Title,
                StartDate = request.StartDate,
                EndDate = request.EndDate
            };

            var newBudgetId = await _mediator.Send(newBudget);
            return CreatedAtAction(nameof(GetBudgetById), new { id = newBudgetId }, request);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBudget(int id, [FromBody] UpdateBudgetCommand request)
        {
            await _mediator.Send(request);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBudget(int id)
        {
            await _mediator.Send(new DeleteBudgetCommand(id));
            return NoContent();
        }

        [HttpGet("{id}/export/pdf")]
        public async Task<IActionResult> ExportToPdf(string id)
        {
            var result = await _mediator.Send(new ExportBudgetToPdfQuery(id));

            if (result == null)
            {
                return NotFound();
            }

            return File(result.Content, result.ContentType, result.FileName);

        }

        [HttpPost("{id}/share")]
        public async Task<IActionResult> GenerateShareToken(string id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var shareToken = await _mediator.Send(new GenerateBudgetShareTokenCommand(id, userId));
            return Ok(new { Token = shareToken, Url = $"http://localhost:3000/shared/{shareToken}" });
        }

        [HttpDelete("{id}/share")]
        public async Task<IActionResult> RevokeShareToken(string id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            await _mediator.Send(new RevokeBudgetShareTokenCommand(id, userId));
            return NoContent();
        }
    }
}
