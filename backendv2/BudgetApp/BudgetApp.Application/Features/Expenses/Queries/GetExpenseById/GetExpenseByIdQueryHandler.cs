using AutoMapper;
using BudgetApp.Application.DTOs;
using BudgetApp.Application.Interfaces;
using BudgetApp.Domain.Expectations;
using BudgetApp.Domain.Interfaces;
using BudgetWebApi.Domain.Interfaces.MainInterface;
using BudgetWebApi.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Features.Expenses.Queries.GetExpenseById
{
    public class GetExpenseByIdQueryHandler : IRequestHandler<GetExpenseByIdQuery, ExpenseDTO>
    {
        private readonly IExpenseRepository _repository;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public GetExpenseByIdQueryHandler(IExpenseRepository repository, IMapper mapper, ICurrentUserService currentUserService)
        {
            _repository = repository;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task<ExpenseDTO> Handle(GetExpenseByIdQuery request, CancellationToken cancellationToken)
        {
            Expense? expense;
            var userRole = _currentUserService.UserRole;
            var userId = _currentUserService.UserId;
            string? userIdFilter = userRole == "Admin" ? null : userId;
            
            expense = await _repository.GetByIdAsync(request.Id, userIdFilter, request.BudgetId, cancellationToken);

            if (expense == null)
            {

                throw new NotFoundException($"Expense with ID {request.Id} not found in Budget {request.BudgetId}.");
            }
            return _mapper.Map<ExpenseDTO>(expense);
        }
    }
}
