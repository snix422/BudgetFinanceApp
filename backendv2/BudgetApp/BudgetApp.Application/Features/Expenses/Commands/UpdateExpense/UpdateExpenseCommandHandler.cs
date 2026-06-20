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

namespace BudgetApp.Application.Features.Expenses.Commands.UpdateExpense
{
    public class UpdateExpenseCommandHandler : IRequestHandler<UpdateExpenseCommand>
    {
        private readonly IExpenseRepository _repository;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;
        private readonly IBudgetRepository _budgetRepository;

        public UpdateExpenseCommandHandler(IExpenseRepository repository, IMapper mapper, ICurrentUserService currentUserService, IBudgetRepository budgetRepository)
        {
            _repository = repository;
            _mapper = mapper;
            _currentUserService = currentUserService;
            _budgetRepository = budgetRepository;
        }

        public async Task Handle(UpdateExpenseCommand request, CancellationToken cancellationToken)
        {
            var userId = _currentUserService.UserId;
            var userRole = _currentUserService.UserRole;
            string userIdFilter = userRole == "Admin" ? null : userId;

            var expense = await _repository.GetByIdAsync(request.Id, userIdFilter, request.BudgetId, cancellationToken);
            if (expense == null)
            {
                throw new NotFoundException("Expense not found or access denied.");
            }

           
            var originalBudgetId = expense.BudgetId;
            _mapper.Map(request, expense);
            expense.BudgetId = originalBudgetId;
            await _repository.Update(expense,cancellationToken);
        }
    }
}
