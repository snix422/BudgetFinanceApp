using BudgetApp.Application.DTOs;
using BudgetApp.Application.Features.Budgets.Queries.GetBudgetByIdForAdmin;
using BudgetApp.Application.Features.Budgets.Queries.GetBudgetsByAdmin;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BudgetApp.Api.Controllers
{

    [ApiController]
    [Route("api/admin/users/")]
    [Authorize(Roles = "Admin")]
    public class AdminBudgetController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AdminBudgetController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{userId}/budgets")]
        public async Task<ActionResult<IEnumerable<BudgetDTO>>> GetBudgetsByUserId(string userId)
        {
            var budgets = await _mediator.Send(new GetBudgetsByAdminQuery(userId));
            return Ok(budgets);
        }

        [HttpGet("{userId}/budgets/{budgetId}")]
        public async Task<ActionResult<BudgetDTO>> GetBudgetByUserIdAndBudgetId(string userId, int budgetId)
        {
            var budget = await _mediator.Send(new GetBudgetByIdForAdminQuery(userId, budgetId));

            return Ok(budget);
        }
    }
}
