using BudgetApp.Application.DTOs;
using MediatR;

namespace BudgetApp.Application.Features.Incomes.Queries.GetIncomeById;

public record GetIncomeByIdQuery(int Id, int BudgetId) : IRequest<IncomeDTO>;
