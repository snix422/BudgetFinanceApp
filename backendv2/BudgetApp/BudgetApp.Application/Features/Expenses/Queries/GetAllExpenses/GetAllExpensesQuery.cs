using BudgetApp.Application.DTOs;
using MediatR;

namespace BudgetApp.Application.Features.Expenses.Queries.GetAllExpenses;

public record GetAllExpensesQuery(int BudgetId) : IRequest<IEnumerable<ExpenseDTO>>;
