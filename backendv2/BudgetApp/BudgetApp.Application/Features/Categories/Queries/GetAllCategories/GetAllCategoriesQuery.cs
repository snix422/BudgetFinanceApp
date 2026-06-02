using BudgetApp.Application.DTOs;
using MediatR;

namespace BudgetApp.Application.Features.Categories.Queries.GetAllCategories;

public record GetAllCategoriesQuery : IRequest<IEnumerable<CategoryDTO>>;
