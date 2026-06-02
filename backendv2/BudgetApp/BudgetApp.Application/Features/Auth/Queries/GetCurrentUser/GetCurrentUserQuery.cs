using BudgetApp.Application.DTOs;
using MediatR;

namespace BudgetApp.Application.Features.Auth.Queries.GetCurrentUser;

public record GetCurrentUserQuery : IRequest<UserDTO>;
