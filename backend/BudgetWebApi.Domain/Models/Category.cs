using System;
using BudgetWebApi.Domain.Models;

namespace BudgetWebApi.Domain.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsExpense { get; set; }
    }
}


