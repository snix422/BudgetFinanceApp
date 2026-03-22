using System;
using BudgetApp.Domain.Enums;

namespace BudgetApp.Domain.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public CategoryRule Rule { get; set; }

        public ICollection<Expense> Expenses { get; set; } = new List<Expense>();

    }

}
