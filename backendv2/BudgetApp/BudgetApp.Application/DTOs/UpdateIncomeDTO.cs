namespace BudgetApp.Application.DTOs;

public record UpdateIncomeDTO
{
    public string Title { get; init; } = string.Empty;
    public decimal Amount { get; init; }
    public DateTime Date { get; init; }
    public int CategoryId { get; init; }
}
