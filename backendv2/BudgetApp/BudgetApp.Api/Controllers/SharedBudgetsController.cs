using BudgetApp.Application.Features.Budgets.Queries.GetSharedBudget;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BudgetApp.Api.Controllers
{
    [ApiController]
    [Route("api/budgets/shared")]
    public class SharedBudgetsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public SharedBudgetsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{token}")]
        public async Task<IActionResult> GetSharedBudget(Guid token)
        {
            var sharedBudget = await _mediator.Send(new GetSharedBudgetQuery(token));

            if (sharedBudget == null)
            {
                return NotFound(new { message = "Nie znaleziono budżetu pod tym linkiem." });
            }

            return Ok(sharedBudget);
        }

    }
}
