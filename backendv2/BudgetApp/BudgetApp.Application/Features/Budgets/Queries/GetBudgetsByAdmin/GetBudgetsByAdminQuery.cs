using BudgetApp.Application.DTOs;
using MediatR;

namespace BudgetApp.Application.Features.Budgets.Queries.GetBudgetsByAdmin;

public record GetBudgetsByAdminQuery(string TargetUserId) : IRequest<IEnumerable<BudgetDTO>>;
