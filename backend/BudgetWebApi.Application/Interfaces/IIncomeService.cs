using System;

public interface IIncomeService
{
    Task<IEnumerable<Income>> GetAllAsync();
    Task<Income> GetByIdAsync(int id);
    Task<int> CreateAsync(Cassete cassete);
    Task UpdateAsync(int id, Cassete cassete);
    Task DeleteAsync(int id);
}
