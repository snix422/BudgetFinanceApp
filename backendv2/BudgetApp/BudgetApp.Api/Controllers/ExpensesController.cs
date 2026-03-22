using BudgetApp.Application.DTOs;
using BudgetApp.Application.Features.Budgets.Commands.CreateBudget;
using BudgetApp.Application.Features.Budgets.Commands.DeleteBudget;
using BudgetApp.Application.Features.Budgets.Commands.UpdateBudget;
using BudgetApp.Application.Features.Expenses.Commands.CreateExpense;
using BudgetApp.Application.Features.Expenses.Commands.DeleteExpense;
using BudgetApp.Application.Features.Expenses.Commands.UpdateExpense;
using BudgetApp.Application.Features.Expenses.Queries.GetAllExpenses;
using BudgetApp.Application.Features.Expenses.Queries.GetExpenseById;
using BudgetApp.Application.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BudgetApp.Api.Controllers
{
    [ApiController]
    [Route("api")]
    public class ExpensesController : Controller
    {
       
        private readonly IMediator _mediator;

        public ExpensesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("budgets/{budgetId}/expenses")]
        public async Task<ActionResult<IEnumerable<ExpenseDTO>>> GetAllExpensesByBudget([FromRoute] int budgetId)
        {
            var expenses = await _mediator.Send(new GetAllExpensesQuery(budgetId));
            return Ok(expenses);
        }

        [HttpGet("budgets/{budgetId}/expenses/{id}")]
        public async Task<ActionResult<ExpenseDTO>> GetExpenseById([FromRoute] int budgetId, [FromRoute] int id)
        {
            var expense = await _mediator.Send(new GetExpenseByIdQuery(id, budgetId));
            return Ok(expense);
        }

        [HttpPost("budgets/{budgetId}/expenses")]
        public async Task<IActionResult> CreateExpense(int budgetId,[FromBody] CreateExpenseDTO request)
        {
            var newExpenseId = await _mediator.Send(new CreateExpenseCommand(request.Title, request.Amount, request.Date, request.CategoryId, budgetId));
            return CreatedAtAction(nameof(GetExpenseById), new { budgetId = budgetId, id = newExpenseId }, request);
        }

        [HttpPut("budgets/{budgetId}/expenses/{id}")]
        public async Task<IActionResult> UpdateExpense(int id, int budgetId, [FromBody] UpdateExpenseDTO request)
        {
            Console.WriteLine(id);
            await _mediator.Send(new UpdateExpenseCommand(id, request.Title,request.Amount,request.Date, request.CategoryId,budgetId));
            return NoContent();
        }
        
        [HttpDelete("budgets/{budgetId}/expenses/{id}")]
        public async Task<IActionResult> DeleteExpense(int id, int budgetId)
        {
            await _mediator.Send(new DeleteExpenseCommand(id,budgetId));
            return NoContent();
        }
    }
}
