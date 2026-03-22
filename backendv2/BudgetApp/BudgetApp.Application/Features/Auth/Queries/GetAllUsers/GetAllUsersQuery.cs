using BudgetApp.Application.DTOs;
using MediatR;

namespace BudgetApp.Application.Features.Auth.Queries.GetAllUsers;

public record GetAllUsersQuery : IRequest<IEnumerable<UserDTO>>;
