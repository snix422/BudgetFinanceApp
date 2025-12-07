using System;
using Microsoft.AspNetCore.Mvc;
using BudgetWebApi.Api.Models;

[ApiController]
[Route("api/[controller]")]
public class IncomeController : ControllerBase
{
	[HttpGet]
    public async Task<IActionResult> GetAllIncomes()
	{
		
		return Ok(new[] { "Income1", "Income2" });
    }

	[HttpGet("{id}")]
	public async Task<IActionResult> GetIncomeById(int id)
	{
		return Ok($"Income{id}");
    }

    [HttpPost]
    public async Task<IActionResult> CreateIncome([FromBody] CreateIncomeDTO request)
    {
       
        if (request.Amount <= 0)
        {
            return BadRequest("Kwota musi być większa od zera.");
        }

        return CreatedAtAction(nameof(GetIncomeById), new { id = 123 }, request);
    }

   
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateIncome(int id, [FromBody] UpdateIncomeDTO request)
    {
        return NoContent(); 
    }

  
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteIncome(int id)
    { 

        return NoContent(); 
    }



}
