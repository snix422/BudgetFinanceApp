using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetWebApi.Domain.Interfaces.MainInterface;

public interface IMainInterface<T> where T : class
{
    Task<IEnumerable<T>> GetAllAsync();
    Task<T?> GetByIdAsync(int id);
    Task AddAsync(T item);
    void Update(T item);
    void Delete(T item);
}


