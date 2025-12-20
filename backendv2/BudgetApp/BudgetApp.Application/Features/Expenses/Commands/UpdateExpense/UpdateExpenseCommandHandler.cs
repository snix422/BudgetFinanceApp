using AutoMapper;
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

namespace BudgetApp.Application.Features.Expenses.Commands.UpdateExpense
{
    public class UpdateExpenseCommandHandler
    {
        private readonly IExpenseInterface _repository;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;
        private readonly IBudgetInterface _budgetRepository;

        public UpdateExpenseCommandHandler(IExpenseInterface repository, IMapper mapper, ICurrentUserService currentUserService, IBudgetInterface budgetRepository)
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

            /*if (request.BudgetId != expense.BudgetId)
            {
                // Jeśli tak, musimy sprawdzić, czy ma prawo do TEGO NOWEGO budżetu
                var targetBudget = await _budgetRepository.GetByIdAsync(request.BudgetId, userIdFilter, cancellationToken);

                if (targetBudget == null)
                {
                    throw new BadRequestException("Cannot move expense to a budget you don't own.");
                }

                // Jeśli targetBudget istnieje i jest nasz -> jest OK.
            }*/
            var originalBudgetId = expense.BudgetId;
            _mapper.Map(request, expense);
            expense.BudgetId = originalBudgetId;
            await _repository.Update(expense,cancellationToken);
        }
    }
}
