using BudgetApp.Application.Common;
using MediatR;

namespace BudgetApp.Application.Features.Auth.Commands.Login;

public record LoginCommand(string Email, string Password) : IRequest<Result<string>>;
