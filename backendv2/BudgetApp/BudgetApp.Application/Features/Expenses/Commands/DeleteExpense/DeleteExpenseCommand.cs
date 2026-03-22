using MediatR;

namespace BudgetApp.Application.Features.Expenses.Commands.DeleteExpense;

public record DeleteExpenseCommand(int Id, int BudgetId) : IRequest;
