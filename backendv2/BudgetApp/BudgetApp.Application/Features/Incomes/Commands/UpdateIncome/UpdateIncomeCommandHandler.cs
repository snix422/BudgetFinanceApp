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

namespace BudgetApp.Application.Features.Incomes.Commands.UpdateIncome
{
    public class UpdateIncomeCommandHandler : IRequestHandler<UpdateIncomeCommand>
    {
        private readonly IIncomeRepository _repository;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public UpdateIncomeCommandHandler(IIncomeRepository repository, IMapper mapper, ICurrentUserService currentUserService)
        {
            _repository = repository;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task Handle(UpdateIncomeCommand request, CancellationToken cancellationToken)
        {
            var userId = _currentUserService.UserId;
            var userRole = _currentUserService.UserRole;
            string userIdFilter = userRole == "Admin" ? null : userId;
            Console.WriteLine(request);
            var income = await _repository.GetByIdAsync(request.Id, userIdFilter, request.BudgetId, cancellationToken);
            if (income == null)
            {
                throw new NotFoundException("Expense not found or access denied.");
            }

            var originalBudgetId = income.BudgetId;
            _mapper.Map(request, income);

            income.BudgetId = originalBudgetId; 
            await _repository.Update(income,cancellationToken);
            
        }
    }
}
