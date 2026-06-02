using BudgetApp.Application.Common;
using MediatR;

namespace BudgetApp.Application.Features.Auth.Commands.Register;

public record RegisterCommand : IRequest<Result<string>>
{
    public string Email { get; init; } = string.Empty;
    public string FirstName { get; init; } = string.Empty;
    public string LastName { get; init; } = string.Empty;
    public string Password { get; init; } = string.Empty;
    public string Phone { get; init; } = string.Empty;
    public string ConfirmPassword { get; init; } = string.Empty;
}
