using System.Threading;
using System.Threading.Tasks;

namespace BudgetApp.Domain.Interfaces;

public interface IMainInterface<T> where T : class
{
    Task AddAsync(T item, CancellationToken cancellationToken = default);
    Task Update(T item, CancellationToken cancellationToken = default);
    Task<int> Delete(int id, CancellationToken cancellationToken = default);
}
