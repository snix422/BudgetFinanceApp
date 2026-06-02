using MediatR;

namespace BudgetApp.Application.Features.Incomes.Commands.UpdateIncome;

public record UpdateIncomeCommand(int Id, string Title, decimal Amount, DateTime Date, int BudgetId) : IRequest;
