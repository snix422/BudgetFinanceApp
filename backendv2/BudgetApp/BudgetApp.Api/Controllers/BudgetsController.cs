using BudgetApp.Application.DTOs;
using BudgetApp.Application.Features.Budgets.Commands.CreateBudget;
using BudgetApp.Application.Features.Budgets.Commands.DeleteBudget;
using BudgetApp.Application.Features.Budgets.Commands.UpdateBudget;
using BudgetApp.Application.Features.Budgets.Queries.GetAllBudgets;
using BudgetApp.Application.Features.Budgets.Queries.GetBudgetById;
using BudgetApp.Application.Features.Budgets.Queries.GetBudgetsByUser;
using BudgetApp.Application.Interfaces;
using BudgetWebApi.Domain.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BudgetApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BudgetsController : Controller
    {
        private readonly IBudgetService _budgetService;
        private readonly IMediator _mediator;

        public BudgetsController(IBudgetService budgetService, IMediator mediator)
        {
            _budgetService = budgetService;
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
        public async Task<IActionResult> CreateBudget([FromBody] CreateBudgetCommand request)
        {
            var newBudgetId = await _mediator.Send(request);
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

    }
}
