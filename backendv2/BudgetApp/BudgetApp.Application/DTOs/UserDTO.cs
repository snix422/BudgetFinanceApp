namespace BudgetApp.Application.DTOs;

public record UserDTO
{
    public string Id { get; init; } = string.Empty;
    public string Email { get; init; } = string.Empty;
    public string FirstName { get; init; } = string.Empty;
    public string RoleName { get; init; } = string.Empty;
}
