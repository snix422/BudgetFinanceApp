using BudgetApp.Application.DTOs;
using BudgetApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Interfaces
{
    public interface IExpenseService
    {
        Task<IEnumerable<Expense>> GetAllAsync();
        Task<Expense> GetByIdAsync(int id);
        Task<int> CreateAsync(CreateExpenseDTO item);
        Task UpdateAsync(int id, UpdateExpenseDTO item);
        Task DeleteAsync(int id);
    }
}
