using BudgetApp.Application.DTOs;
using BudgetApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Interfaces
{
    public interface IBudgetService
    {
        Task<IEnumerable<Budget>> GetAllAsync();
        Task<IEnumerable<Budget>> GetMyBudgetByUserIdAsync();
        Task<Budget> GetByIdAsync(int id);
        Task<int> CreateAsync(CreateBudgetDTO item);
        Task UpdateAsync(int id, UpdateBudgetDTO item);
        Task DeleteAsync(int id);
    }
}
