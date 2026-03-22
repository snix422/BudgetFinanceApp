using MediatR;

namespace BudgetApp.Application.Features.Incomes.Commands.DeleteIncome;

public record DeleteIncomeCommand(int Id, int BudgetId) : IRequest;
