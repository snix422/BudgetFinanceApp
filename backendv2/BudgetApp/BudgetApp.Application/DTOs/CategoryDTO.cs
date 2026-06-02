using BudgetApp.Domain.Enums;

namespace BudgetApp.Application.DTOs;

public record CategoryDTO
{
    public int Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public CategoryRule Rule { get; init; }
}
