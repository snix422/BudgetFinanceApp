using System;
using BudgetWebApi.Domain.Models;

namespace BudgetWebApi.Domain.Models
{

    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;

        public ICollection<Budget> Budgets { get; set; } = new List<Budget>();
        public ICollection<Income> Incomes { get; set; } = new List<Income>();
        public ICollection<Category> Categories { get; set; } = new List<Category>();
    }
}