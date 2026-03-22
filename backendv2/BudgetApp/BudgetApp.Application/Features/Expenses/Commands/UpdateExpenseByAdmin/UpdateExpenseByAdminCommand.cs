using BudgetApp.Application.DTOs;
using MediatR;

namespace BudgetApp.Application.Features.Expenses.Commands.UpdateExpenseByAdmin;

public record UpdateExpenseByAdminCommand(int ExpenseId, UpdateExpenseDTO Dto) : IRequest;
