using BudgetApp.Application.Features.Budgets.Queries.GetSharedBudget;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BudgetApp.Api.Controllers
{
    public class SharedBudgetsController : Controller
    {
        private readonly IMediator _mediator;

        public SharedBudgetsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        public IActionResult Index()
        {
            return View();
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
