using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Features.Incomes.Commands.CreateIncome
{
    public class CreateIncomeCommand : IRequest<int>
    {
        public string Title { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public int BudgetId { get; set; }

        public CreateIncomeCommand(string title, decimal amount, DateTime date, int budget)
        {
            Title = title;
            Amount = amount;
            Date = date;
            BudgetId = budget;
        }
    }
}
