using BudgetApp.Application.DTOs;
using BudgetApp.Application.Features.Expenses.Commands.DeleteExpense;
using BudgetApp.Application.Features.Expenses.Commands.UpdateExpense;
using BudgetApp.Application.Features.Incomes.Commands.DeleteIncome;
using BudgetApp.Application.Features.Incomes.Commands.UpdateIncome;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BudgetApp.Api.Controllers
{
    [Route("api/admin")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminTransactionsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AdminTransactionsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPut("budgets/{budgetId}/expenses/{id}")]
        public async Task<ActionResult> UpdateExpense(int budgetId, int id, [FromBody] UpdateExpenseDTO dto)
        {
           
            await _mediator.Send(new UpdateExpenseCommand(id,dto.Title,dto.Amount,dto.Date, dto.CategoryId, budgetId));
            return NoContent();
        }

        [HttpDelete("budgets/{budgetId}/expenses/{id}")]
        public async Task<ActionResult> DeleteExpense(int id, int budgetId)
        {
           
            await _mediator.Send(new DeleteExpenseCommand(id,budgetId));
            return NoContent();
        }

        [HttpPut("budgets/{budgetId}/incomes/{id}")]
        public async Task<ActionResult> UpdateIncome(int budgetId, int id, [FromBody] UpdateIncomeDTO dto)
        {
           
            await _mediator.Send(new UpdateIncomeCommand(id,dto.Title, dto.Amount,dto.Date,budgetId));
            return NoContent();
        }

        [HttpDelete("budgets/{budgetId}/incomes/{id}")]
        public async Task<ActionResult> DeleteIncome(int budgetId, int id)
        {
           
            await _mediator.Send(new DeleteIncomeCommand(id,budgetId));
            return NoContent();
        }


    }
}
