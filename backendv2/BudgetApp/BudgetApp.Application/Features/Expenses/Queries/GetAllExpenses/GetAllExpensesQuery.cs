using BudgetApp.Application.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Features.Expenses.Queries.GetAllExpenses
{
    public class GetAllExpensesQuery : IRequest<IEnumerable<ExpenseDTO>>
    {
        public int BudgetId { get; set; }

        public GetAllExpensesQuery(int budgetId)
        {
            BudgetId = budgetId;
        }
    }
}
