using AutoMapper;
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
    public class GetSharedBudgetHandler : IRequestHandler<GetSharedBudgetQuery, BudgetDTO>
    {
        private readonly IBudgetRepository _budgetRepository;
        private readonly IMapper _mapper;

        public GetSharedBudgetHandler(IBudgetRepository budgetRepository, IMapper mapper)
        {
            _budgetRepository = budgetRepository;
            _mapper = mapper;
        }

        public async Task<BudgetDTO> Handle(GetSharedBudgetQuery request, CancellationToken cancellationToken)
        {
            var budget = await _budgetRepository.GetByShareTokenAsync(request.Token, cancellationToken);
            if (budget == null)
            {
                throw new NotFoundException("Budget not found");
            }

            var budgetDTO = _mapper.Map<BudgetDTO>(budget);

            var transactions = new List<SharedTransactionDTO>();

            transactions.AddRange(budget.Incomes.Select(i =>
                new SharedTransactionDTO(i.Date, i.Title, i.Amount, "", true)));

            transactions.AddRange(budget.Expenses.Select(e =>
                new SharedTransactionDTO(e.Date, e.Title, e.Amount, e.Category.Name, false)));


            return budgetDTO;
        }
    }
}
