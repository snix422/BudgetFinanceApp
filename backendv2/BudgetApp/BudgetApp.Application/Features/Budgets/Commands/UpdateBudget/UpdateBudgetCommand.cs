using MediatR;

namespace BudgetApp.Application.Features.Budgets.Commands.UpdateBudget;

public record UpdateBudgetCommand : IRequest
{
    public int Id { get; init; }
    public string Title { get; init; } = string.Empty;
    public decimal TotalAmount { get; init; }
    public DateTime StartDate { get; init; }
    public DateTime EndDate { get; init; }
}
