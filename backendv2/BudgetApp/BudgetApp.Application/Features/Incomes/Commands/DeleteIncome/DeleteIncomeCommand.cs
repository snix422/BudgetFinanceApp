using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Features.Incomes.Commands.DeleteIncome
{
    public class DeleteIncomeCommand : IRequest
    {
        public int Id { get; set; }
        public int BudgetId { get; set; }
        public DeleteIncomeCommand(int id, int budgetId)
        {
            Id = id;
            BudgetId = budgetId;
        }
    }
}
