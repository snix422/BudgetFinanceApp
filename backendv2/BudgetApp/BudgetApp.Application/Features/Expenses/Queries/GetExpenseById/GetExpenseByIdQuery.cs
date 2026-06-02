using BudgetApp.Application.DTOs;
using MediatR;

namespace BudgetApp.Application.Features.Expenses.Queries.GetExpenseById;

public record GetExpenseByIdQuery(int Id, int BudgetId) : IRequest<ExpenseDTO>;
