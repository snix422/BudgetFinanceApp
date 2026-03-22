namespace BudgetApp.Application.DTOs;

public record CreateBudgetDTO
{
    public string Title { get; init; } = string.Empty;
    public decimal TotalAmount { get; init; }
    public DateTime StartDate { get; init; }
    public DateTime EndDate { get; init; }
}
