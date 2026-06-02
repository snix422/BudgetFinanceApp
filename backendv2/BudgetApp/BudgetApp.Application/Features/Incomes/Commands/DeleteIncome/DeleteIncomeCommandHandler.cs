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

namespace BudgetApp.Application.Features.Incomes.Commands.DeleteIncome
{
    public class DeleteIncomeCommandHandler : IRequestHandler<DeleteIncomeCommand>
    {
        private readonly IIncomeRepository _repository;
        private readonly ICurrentUserService _currentUserService;

        public DeleteIncomeCommandHandler(IIncomeRepository repository, ICurrentUserService currentUserService)
        {
            _repository = repository;
            _currentUserService = currentUserService;
        }

        public async Task Handle(DeleteIncomeCommand request, CancellationToken cancellationToken)
        {

            var userId = _currentUserService.UserId;
            var userRole = _currentUserService.UserRole;
            var userIdFilter = userRole == "Admin" ? null : userId;

            var income= await _repository.GetByIdAsync(request.Id, userIdFilter, request.BudgetId, cancellationToken);

            if (income == null)
            {  
                throw new NotFoundException("Expense not found or access denied.");
            }

            var rowsAffected = await _repository.Delete(request.Id,cancellationToken);
           

        }
    }
};
