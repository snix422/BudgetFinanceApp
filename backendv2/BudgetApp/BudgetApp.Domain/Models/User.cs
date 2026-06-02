using System;

namespace BudgetApp.Domain.Models
{

    public class User
    {
        public string Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string RoleName { get; set; } = string.Empty;
    }
}