using System;

namespace BudgetApp.Domain.Models
{

    public class Income
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
       
        public int BudgetId { get; set; }
        public Budget Budget { get; set; } = null!;
    }

}
