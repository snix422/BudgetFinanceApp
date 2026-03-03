using System;
using BudgetApp.Domain.Enums;
using BudgetWebApi.Domain.Models;

namespace BudgetWebApi.Domain.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public CategoryRule Rule { get; set; }

        public ICollection<Expense> Expenses { get; set; } = new List<Expense>();

    }

}
