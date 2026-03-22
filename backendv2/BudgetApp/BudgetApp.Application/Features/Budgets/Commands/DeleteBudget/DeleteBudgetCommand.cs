using MediatR;

namespace BudgetApp.Application.Features.Budgets.Commands.DeleteBudget;

public record DeleteBudgetCommand(int Id) : IRequest;
