using BudgetApp.Application.DTOs;
using BudgetApp.Application.Interfaces;
using BudgetWebApi.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace BudgetApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BudgetController : Controller
    {
        private readonly IBudgetService _budgetService;

        public BudgetController(IBudgetService budgetService)
        {
            _budgetService = budgetService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Budget>>> GetAllBudgets()
        {
            var budgets = await _budgetService.GetAllAsync();
            return Ok(budgets);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Budget>> GetBudgetById(int id)
        {
            var budget = await _budgetService.GetByIdAsync(id);
            return Ok(budget);

        }

        [HttpPost]
        public async Task<IActionResult> CreateBudget([FromBody] CreateBudgetDTO request)
        {
            var newBudgetId = await _budgetService.CreateAsync(request);
            return CreatedAtAction(nameof(GetBudgetById), new { id = newBudgetId }, request);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBudget(int id, [FromBody] UpdateBudgetDTO request)
        {
            await _budgetService.UpdateAsync(id, request);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBudget(int id)
        {
            await _budgetService.DeleteAsync(id);
            return NoContent();
        }

    }
}
