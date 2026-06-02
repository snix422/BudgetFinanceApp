using MediatR;

namespace BudgetApp.Application.Features.Incomes.Commands.CreateIncome;

public record CreateIncomeCommand(string Title, decimal Amount, DateTime Date, int BudgetId) : IRequest<int>;
