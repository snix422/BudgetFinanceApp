using BudgetWebApi.Domain.Interfaces.MainInterface;
using BudgetWebApi.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Domain.Interfaces
{
    public interface ITransactionInterface<T> : IMainInterface<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync(string userId, int budgetId, CancellationToken cancellationToken = default);
        Task<T?> GetByIdAsync(int id, string userId, int budgetId, CancellationToken cancellationToken = default);
    }
}
