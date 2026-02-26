using BudgetApp.Domain.Expectations;
using BudgetApp.Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Features.Budgets.Commands.RevokeShareToken
{
    public class RevokeBudgetShareTokenHandler : IRequestHandler<RevokeBudgetShareTokenCommand>
    {
        private readonly IBudgetRepository _budgetRepository;
        public RevokeBudgetShareTokenHandler(IBudgetRepository budgetRepository)
        {
            _budgetRepository = budgetRepository;
        }
        public async Task Handle(RevokeBudgetShareTokenCommand request, CancellationToken cancellationToken)
        {
            var budget = await _budgetRepository.GetByIdAsync(int.Parse(request.BudgetId), request.UserId, cancellationToken);

            if (budget == null)
            {
                throw new NotFoundException("Budget not found");
            }

            budget.ShareToken = null;
            await _budgetRepository.Update(budget, cancellationToken);
            //return Unit.Value;
        }
    }
}
