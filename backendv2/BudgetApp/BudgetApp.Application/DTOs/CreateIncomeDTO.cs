namespace BudgetApp.Application.DTOs;

public record CreateIncomeDTO
{
    public string Title { get; init; } = string.Empty;
    public decimal Amount { get; init; }
    public DateTime Date { get; init; }
}
