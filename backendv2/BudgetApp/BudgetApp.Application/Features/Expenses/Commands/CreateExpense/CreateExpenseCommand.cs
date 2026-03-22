using MediatR;

namespace BudgetApp.Application.Features.Expenses.Commands.CreateExpense;

public record CreateExpenseCommand(string Title, decimal Amount, DateTime Date, int CategoryId, int BudgetId) : IRequest<int>;
