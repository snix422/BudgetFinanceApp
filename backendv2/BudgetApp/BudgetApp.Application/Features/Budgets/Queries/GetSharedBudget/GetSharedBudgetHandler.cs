using BudgetApp.Application.DTOs;
using BudgetApp.Domain.Expectations;
using BudgetApp.Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Features.Budgets.Queries.GetSharedBudget
{
    public class GetSharedBudgetHandler : IRequestHandler<GetSharedBudgetQuery, SharedBudgetDTO>
    {
        private readonly IBudgetRepository _budgetRepository;

        public GetSharedBudgetHandler(IBudgetRepository budgetRepository)
        {
            _budgetRepository = budgetRepository;
        }

        public async Task<SharedBudgetDTO> Handle(GetSharedBudgetQuery request, CancellationToken cancellationToken)
        {
            var budget = await _budgetRepository.GetByShareTokenAsync(request.Token, cancellationToken);
            if (budget == null)
            {
                throw new NotFoundException("Budget not found");
            }

            var transactions = new List<SharedTransactionDTO>();

            transactions.AddRange(budget.Incomes.Select(i =>
                new SharedTransactionDTO(i.Date, i.Title, i.Amount, "", true)));

            transactions.AddRange(budget.Expenses.Select(e =>
                new SharedTransactionDTO(e.Date, e.Title, e.Amount, e.Category.Name, false)));


            return new SharedBudgetDTO(
             Name: budget.Title,
             TotalIncomes: budget.Incomes.Sum(i => i.Amount),
             TotalExpenses: budget.Expenses.Sum(e => e.Amount),
             Transactions: transactions.OrderByDescending(t => t.Date).ToList()
         );
        }
    }
}
