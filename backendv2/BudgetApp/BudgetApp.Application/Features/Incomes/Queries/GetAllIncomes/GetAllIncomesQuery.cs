using BudgetApp.Application.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Features.Incomes.Queries.GetAllIncomes
{
    public class GetAllIncomesQuery : IRequest<IEnumerable<IncomeDTO>>
    {
        public int BudgetId { get; set; }

        public GetAllIncomesQuery(int budgetId)
        {
            BudgetId = budgetId;
        }
    }
}
