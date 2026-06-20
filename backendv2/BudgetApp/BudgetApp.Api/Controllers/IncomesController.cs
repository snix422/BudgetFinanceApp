using BudgetApp.Application.DTOs;
using BudgetApp.Application.Features.Expenses.Commands.UpdateExpense;
using BudgetApp.Application.Features.Incomes.Commands.CreateIncome;
using BudgetApp.Application.Features.Incomes.Commands.DeleteIncome;
using BudgetApp.Application.Features.Incomes.Commands.UpdateIncome;
using BudgetApp.Application.Features.Incomes.Queries.GetAllIncomes;
using BudgetApp.Application.Features.Incomes.Queries.GetIncomeById;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BudgetApp.Api.Controllers
{
    [ApiController]
    [Route("api")]
    public class IncomesController : Controller
    {
        
        private readonly IMediator _mediator;
        public IncomesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        
        [HttpGet("budgets/{budgetId}/incomes")]
        public async Task<IActionResult> GetAllIncomes([FromRoute] int budgetId)
        {
            var incomes = await _mediator.Send(new GetAllIncomesQuery(budgetId));

            return Ok(incomes);
        }

        [HttpGet("budgets/{budgetId}/incomes/{id}")]
        public async Task<IActionResult> GetIncomeById([FromRoute] int budgetId, [FromRoute]int id)
        {
            var income = await _mediator.Send(new GetIncomeByIdQuery(id, budgetId));

            return Ok(income);
        }

        [HttpPost("budgets/{budgetId}/incomes")]
        public async Task<IActionResult> CreateIncome(int budgetId, [FromBody] CreateIncomeDTO request)
        {

           var newIncomeId = await _mediator.Send(new CreateIncomeCommand(request.Title,request.Amount,request.Date,budgetId));

           return CreatedAtAction(nameof(GetIncomeById), new { id = newIncomeId, budgetId = budgetId }, newIncomeId);
        }


        [HttpPut("budgets/{budgetId}/incomes/{id}")]
        public async Task<IActionResult> UpdateIncome(int budgetId, int id, [FromBody] UpdateIncomeDTO request)
        {
           
         
            await _mediator.Send(new UpdateIncomeCommand(id, request.Title,request.Amount,request.Date, budgetId));

            return NoContent();
        }


        [HttpDelete("budgets/{budgetId}/incomes/{id}")]
        public async Task<IActionResult> DeleteIncome(int budgetId,int id)
        {
            await _mediator.Send(new DeleteIncomeCommand(id, budgetId));

            return NoContent();
        }
    }
}
