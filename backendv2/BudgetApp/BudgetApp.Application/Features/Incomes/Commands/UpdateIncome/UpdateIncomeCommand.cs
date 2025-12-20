using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Features.Incomes.Commands.UpdateIncome
{
    public class UpdateIncomeCommand : IRequest
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public int CategoryId { get; set; }
        public int BudgetId { get; set; }

        public UpdateIncomeCommand(int id, string title, decimal amount, DateTime date, int categoryId, int budgetId)
        {
            id = Id;
            Title = title;
            Amount = amount;
            Date = date;
            CategoryId = categoryId;
            BudgetId = budgetId;
        }
    }
}
