using BudgetApp.Application.DTOs;
using MediatR;

namespace BudgetApp.Application.Features.Budgets.Queries.GetBudgetByIdForAdmin;

public record GetBudgetByIdForAdminQuery(string UserId, int BudgetId) : IRequest<BudgetDTO>;
