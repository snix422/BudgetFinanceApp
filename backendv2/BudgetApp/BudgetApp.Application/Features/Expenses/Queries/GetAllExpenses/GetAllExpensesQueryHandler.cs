using AutoMapper;
using BudgetApp.Application.DTOs;
using BudgetApp.Application.Interfaces;
using BudgetApp.Domain.Interfaces;
using BudgetApp.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Features.Expenses.Queries.GetAllExpenses
{
    public class GetAllExpensesQueryHandler : IRequestHandler<GetAllExpensesQuery, IEnumerable<ExpenseDTO>>
    {
        private readonly IExpenseRepository _repository;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public GetAllExpensesQueryHandler(IExpenseRepository repository, IMapper mapper, ICurrentUserService currentUserService)
        {
            _repository = repository;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task<IEnumerable<ExpenseDTO>> Handle(GetAllExpensesQuery request, CancellationToken cancellationToken)
        {
            var userId = _currentUserService.UserId;
            var userRole = _currentUserService.UserRole;
            string? userIdFilter = (userRole == "Admin") ? null : userId;
            var expenses = await _repository.GetAllAsync(userIdFilter, request.BudgetId, cancellationToken);
         
            return _mapper.Map<IEnumerable<ExpenseDTO>>(expenses);
        }
    }
}
