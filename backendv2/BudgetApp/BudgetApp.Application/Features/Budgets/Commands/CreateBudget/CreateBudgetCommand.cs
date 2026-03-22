using MediatR;

namespace BudgetApp.Application.Features.Budgets.Commands.CreateBudget;

public record CreateBudgetCommand : IRequest<int>
{
    public int Id { get; init; }
    public string Title { get; init; } = string.Empty;
    public decimal TotalAmount { get; init; }
    public DateTime StartDate { get; init; }
    public DateTime EndDate { get; init; }
}
