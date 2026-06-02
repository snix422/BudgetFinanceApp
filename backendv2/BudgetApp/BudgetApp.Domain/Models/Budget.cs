using System;

namespace BudgetApp.Domain.Models
{
    public class Budget
    {
        public int Id { get; set; }
        public required string Title { get; set; } 
        public required DateTime StartDate { get; set; } 
        public required DateTime EndDate { get; set; } 
        public required string UserId { get; set; } 
        public ICollection<Expense> Expenses { get; set; } = new List<Expense>();
        public ICollection<Income> Incomes { get; set; } = new List<Income>();

        public Guid? ShareToken { get; set; }
        public bool IsShared => ShareToken.HasValue;

        public bool Is80PercentAlertSend { get; set; } = false;

        public bool IsSummaryEmailSent { get; set; } = false;

    }
}
 