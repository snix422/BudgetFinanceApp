using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.DTOs
{
    public class BudgetDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal TotalSpent { get; set; }    // Suma wydatków
        public decimal TotalEarned { get; set; }   // Suma dochodów
        public decimal RemainingAmount { get; set; } // Ile zostało (TotalAmount - TotalSpent)
    }
}
