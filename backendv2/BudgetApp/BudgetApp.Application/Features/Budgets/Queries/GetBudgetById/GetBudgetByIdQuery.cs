using BudgetApp.Application.DTOs;
using MediatR;

namespace BudgetApp.Application.Features.Budgets.Queries.GetBudgetById;

public record GetBudgetByIdQuery(int Id) : IRequest<BudgetDTO>;
