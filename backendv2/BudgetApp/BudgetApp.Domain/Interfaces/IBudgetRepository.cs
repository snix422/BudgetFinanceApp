using BudgetApp.Domain.Interfaces;
using BudgetApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Domain.Interfaces
{
    public interface IBudgetRepository : IMainInterface<Budget>
    {
        Task<IEnumerable<Budget>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<IEnumerable<Budget>> GetAllByUserIdAsync(string userId, CancellationToken cancellationToken = default);
        Task<Budget?> GetByIdAsync(int id, string userId, CancellationToken cancellationToken = default);

        Task<Budget?> GetByShareTokenAsync(Guid shareToken, CancellationToken cancellationToken = default);
    }
}
