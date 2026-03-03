using BudgetApp.Domain.Expectations;
using BudgetApp.Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Features.Budgets.Commands.GenerateBudgetShareToken
{
    public class GenerateBudgetShareTokenHandler : IRequestHandler<GenerateBudgetShareTokenCommand, Guid>
    {
        private readonly IBudgetRepository _budgetRepository;

        public GenerateBudgetShareTokenHandler(IBudgetRepository budgetRepository)
        {
            _budgetRepository = budgetRepository;
        }

        public async Task<Guid> Handle(GenerateBudgetShareTokenCommand request, CancellationToken cancellationToken)
        {
            var budget = await _budgetRepository.GetByIdAsync(int.Parse(request.BudgetId), request.UserId, cancellationToken);
            
            if (budget == null)
            {
                throw new NotFoundException("Budget not found");
            }

           budget.ShareToken = budget.ShareToken ?? Guid.NewGuid();
           await _budgetRepository.Update(budget, cancellationToken);
           return budget.ShareToken.Value;
        }

    }
}
