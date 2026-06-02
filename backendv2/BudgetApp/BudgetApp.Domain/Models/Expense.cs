using System;

namespace BudgetApp.Domain.Models
{
    public class Expense
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; } = null!;
        public int BudgetId { get; set; }
        public Budget Budget { get; set; } = null!;

    }
}
