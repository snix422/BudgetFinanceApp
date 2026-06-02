using BudgetApp.Application.DTOs;
using MediatR;

namespace BudgetApp.Application.Features.Budgets.Queries.GetAllBudgets;

public record GetAllBudgetsQuery : IRequest<IEnumerable<BudgetDTO>>;
