using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Features.Expenses.Commands.DeleteExpense
{
    public class DeleteExpenseCommand : IRequest
    {
        public int Id { get; set; }
        public int BudgetId { get; set; }
        public DeleteExpenseCommand(int id, int budgetId)
        {
            Id = id;
            BudgetId = budgetId;
        }
    }
}
