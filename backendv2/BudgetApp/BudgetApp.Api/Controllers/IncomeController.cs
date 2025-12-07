using BudgetApp.Application.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace BudgetApp.Api.Controllers
{
    public class IncomeController : Controller
    {
        private readonly IIncomeService _incomeService;
        public IncomeController(IIncomeService incomeService)
        {
            _incomeService = incomeService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllIncomes()
        {
            var incomes = await _incomeService.GetAllAsync();

            return Ok(incomes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetIncomeById(int id)
        {
            var income = await _incomeService.GetByIdAsync(id);

            return Ok(income);
        }

        [HttpPost]
        public async Task<IActionResult> CreateIncome([FromBody] CreateIncomeDTO request)
        {

           var newIncomeId = await _incomeService.CreateAsync(request);

           return CreatedAtAction(nameof(GetIncomeById), new { id = newIncomeId }, request);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateIncome(int id, [FromBody] UpdateIncomeDTO request)
        {
            await _incomeService.UpdateAsync(id, request);

            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIncome(int id)
        {
            await _incomeService.DeleteAsync(id);

            return NoContent();
        }
    }
}
