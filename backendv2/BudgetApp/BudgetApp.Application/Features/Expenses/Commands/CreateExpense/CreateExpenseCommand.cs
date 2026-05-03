using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Features.Expenses.Commands.CreateExpense
{
    public class CreateExpenseCommand : IRequest<int>
    {
        public string Title { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public int CategoryId { get; set; }
        public int BudgetId { get; set; }
        public CreateExpenseCommand(string title, decimal amount, DateTime date, int categoryId, int budgetId)
        {
            Title = title;
            Amount = amount;
            Date = date;
            CategoryId = categoryId;
            BudgetId = budgetId;
        }
    }
}
