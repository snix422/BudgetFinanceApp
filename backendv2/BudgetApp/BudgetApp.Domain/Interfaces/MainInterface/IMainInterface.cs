using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace BudgetWebApi.Domain.Interfaces.MainInterface;

public interface IMainInterface<T> where T : class
{
    //Task<IEnumerable<T>> GetAllAsync(int? budgetId = null, CancellationToken cancellationToken = default);
    //Task<IEnumerable<T>> GetAllByUserIdAsync(string userId, CancellationToken cancellationToken = default);
    //Task<T?> GetByIdAsync(int id, string? userId, CancellationToken cancellationToken = default);
    Task AddAsync(T item, CancellationToken cancellationToken = default);
    Task Update(T item, CancellationToken cancellationToken = default);
    Task<int> Delete(int id, CancellationToken cancellationToken = default);
}
