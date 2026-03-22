using AutoMapper;
using BudgetApp.Application.Interfaces;
using BudgetApp.Domain.Expectations;
using BudgetApp.Domain.Interfaces;
using BudgetApp.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Features.Expenses.Commands.CreateExpense
{
    public class CreateExpenseCommandHandler : IRequestHandler<CreateExpenseCommand, int>
    {
        private readonly IExpenseRepository _repository;
        private readonly IBudgetRepository _budgetRepository;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public CreateExpenseCommandHandler(IExpenseRepository repository, IMapper mapper, ICurrentUserService currentUserService, IBudgetRepository budgetRepository)
        {
            _repository = repository;
            _mapper = mapper;
            _currentUserService = currentUserService;
            _budgetRepository = budgetRepository;
        }

        public async Task<int> Handle(CreateExpenseCommand request, CancellationToken cancellationToken)
        {
            var userId = _currentUserService.UserId;
            var userRole = _currentUserService.UserRole;
            var userIdFilter = userRole == "Admin" ? null : userId;
            var budget = await _budgetRepository.GetByIdAsync(request.BudgetId, userIdFilter, cancellationToken);

            if (budget == null)
            {
                throw new NotFoundException($"Budget with ID {request.BudgetId} not found or access denied.");
            }

            var expense = _mapper.Map<Expense>(request);
            expense.BudgetId = request.BudgetId;

            await _repository.AddAsync(expense, cancellationToken);
            return expense.Id;
        }
    }
}
