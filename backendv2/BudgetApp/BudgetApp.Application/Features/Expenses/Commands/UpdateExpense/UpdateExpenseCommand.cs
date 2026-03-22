using MediatR;

namespace BudgetApp.Application.Features.Expenses.Commands.UpdateExpense;

public record UpdateExpenseCommand(int Id, string Title, decimal Amount, DateTime Date, int CategoryId, int BudgetId) : IRequest;
