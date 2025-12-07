using BudgetApp.Application.DTOs;
using BudgetApp.Application.Interfaces;
using BudgetWebApi.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace BudgetApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExpenseController : Controller
    {
        private readonly IExpenseService _expenseService;

        public ExpenseController(IExpenseService expenseService)
        {
            _expenseService = expenseService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Expense>>> GetAllExpenses()
        {
            var expenses = await _expenseService.GetAllAsync();
            return Ok(expenses);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Expense>> GetExpenseById(int id)
        {
            var expense = await _expenseService.GetByIdAsync(id);
            return Ok(expense);
        }

        [HttpPost]
        public async Task<IActionResult> CreateExpense([FromBody] CreateExpenseDTO request)
        {
            var newExpenseId = await _expenseService.CreateAsync(request);
            return CreatedAtAction(nameof(GetExpenseById), new { id = newExpenseId }, request);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateExpense(int id, [FromBody] UpdateExpenseDTO request)
        {
            await _expenseService.UpdateAsync(id, request);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExpense(int id)
        {
            await _expenseService.DeleteAsync(id);
            return NoContent();
        }
    }
}
