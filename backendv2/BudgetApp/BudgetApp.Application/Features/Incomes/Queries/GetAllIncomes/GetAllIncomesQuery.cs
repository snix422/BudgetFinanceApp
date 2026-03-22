using BudgetApp.Application.DTOs;
using MediatR;

namespace BudgetApp.Application.Features.Incomes.Queries.GetAllIncomes;

public record GetAllIncomesQuery(int BudgetId) : IRequest<IEnumerable<IncomeDTO>>;
