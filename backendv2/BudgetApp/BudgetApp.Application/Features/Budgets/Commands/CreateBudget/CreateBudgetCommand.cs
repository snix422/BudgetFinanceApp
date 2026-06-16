using MediatR;
using System;

namespace BudgetApp.Application.Features.Budgets.Commands.CreateBudget;

public record CreateBudgetCommand(string Title, decimal TotalAmount, DateTime StartDate, DateTime EndDate) : IRequest<int>;


