using BudgetApp.Application.DTOs;
using MediatR;

namespace BudgetApp.Application.Features.Budgets.Queries.GetBudgetsByUser;

public record GetBudgetsByUserQuery : IRequest<IEnumerable<BudgetDTO>>;
