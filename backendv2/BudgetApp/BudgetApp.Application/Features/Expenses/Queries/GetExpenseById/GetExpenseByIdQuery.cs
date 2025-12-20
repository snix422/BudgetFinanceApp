using BudgetApp.Application.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Features.Expenses.Queries.GetExpenseById
{
    public class GetExpenseByIdQuery : IRequest<ExpenseDTO>
    {
        public int Id { get; set; }
        public int BudgetId { get; set; }
        public GetExpenseByIdQuery(int id, int budgetId)
        {
            Id = id;
            BudgetId = budgetId;
        }
    }
}
