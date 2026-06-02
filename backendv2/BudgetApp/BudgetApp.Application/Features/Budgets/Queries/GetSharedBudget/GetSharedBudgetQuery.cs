using BudgetApp.Application.DTOs;
using MediatR;

namespace BudgetApp.Application.Features.Budgets.Queries.GetSharedBudget;

namespace BudgetApp.Application.Features.Budgets.Queries.GetSharedBudget
{
   public record GetSharedBudgetQuery(Guid Token) : IRequest<BudgetDTO>;
}
