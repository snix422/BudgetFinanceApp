namespace BudgetApp.Application.DTOs;

public record BudgetDTO
{
    public int Id { get; init; }
    public string Title { get; init; } = string.Empty;
    public DateTime StartDate { get; init; }
    public DateTime EndDate { get; init; }
    public decimal TotalSpent { get; init; }
    public decimal TotalEarned { get; init; }
    public decimal RemainingAmount { get; init; }
}
