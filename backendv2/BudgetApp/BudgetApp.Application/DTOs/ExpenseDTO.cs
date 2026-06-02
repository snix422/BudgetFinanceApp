using BudgetApp.Domain.Enums;

namespace BudgetApp.Application.DTOs;

public record ExpenseDTO
{
    public int Id { get; init; }
    public string Title { get; init; } = string.Empty;
    public decimal Amount { get; init; }
    public DateTime Date { get; init; }
    public int CategoryId { get; init; }
    public string CategoryName { get; init; } = string.Empty;
    public CategoryRule CategoryRule { get; init; }
}
