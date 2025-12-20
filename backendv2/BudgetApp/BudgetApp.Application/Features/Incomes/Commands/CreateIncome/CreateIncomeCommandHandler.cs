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

namespace BudgetApp.Application.Features.Incomes.Commands.CreateIncome
{
    public class CreateIncomeCommandHandler
    {
        private readonly IIncomeInterface _repository;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;
        private readonly IBudgetInterface _budgetRepository;

        public CreateIncomeCommandHandler(IIncomeInterface repository, IMapper mapper, ICurrentUserService currentUserService, IBudgetInterface budgetInterface)
        {
            _repository = repository;
            _mapper = mapper;
            _currentUserService = currentUserService;
            _budgetRepository = budgetInterface;
        }

        public async Task<int> Handle(CreateIncomeCommand request, CancellationToken cancellationToken)
        {
            var userId = _currentUserService.UserId;
            var userRole = _currentUserService.UserRole;
            var userIdFilter = userRole == "Admin" ? null : userId;
            var budget = await _budgetRepository.GetByIdAsync(request.BudgetId, userIdFilter);

            if (budget == null)
            {
                throw new NotFoundException($"Budget with ID {request.BudgetId} not found or access denied.");
            }

            var income = _mapper.Map<Income>(request);
            income.BudgetId = request.BudgetId;

            await _repository.AddAsync(income,cancellationToken);
            return income.Id;
        }
    }
}
