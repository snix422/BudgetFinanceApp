using AutoMapper;
using BudgetApp.Application.DTOs;
using BudgetApp.Application.Features.Budgets.Notifications;
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
        private readonly IPublisher _publisher;

        public CreateExpenseCommandHandler(IExpenseRepository repository, IMapper mapper, ICurrentUserService currentUserService, IBudgetRepository budgetRepository, IPublisher publisher)
        {
            _repository = repository;
            _mapper = mapper;
            _currentUserService = currentUserService;
            _budgetRepository = budgetRepository;
            _publisher = publisher;
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
            var budgetDTO = _mapper.Map<BudgetDTO>(budget);

            await _repository.AddAsync(expense, cancellationToken);

            var newTotalExpenses = budgetDTO.TotalSpent + expense.Amount;

            if(budgetDTO.TotalEarned > 0)
            {
                var currentPercentage = (newTotalExpenses / budgetDTO.TotalEarned)   * 100m;
                if(currentPercentage >= 80m)
                {
                    var userEmail = _currentUserService.UserEmail ?? "brak-maila@test.pl";

                    var notification = new BudgetAlertExceededNotification(budget.Id, currentPercentage, userEmail);

                    await _publisher.Publish(notification, cancellationToken);
                }
            }

            return expense.Id;
        }
    }
}
