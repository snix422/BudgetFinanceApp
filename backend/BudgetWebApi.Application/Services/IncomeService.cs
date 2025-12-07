using System;

public class IncomeService : IIncomeService
{
	public async Task Task<IEnumerable<Income>> GetAllAsync()
	{
		throw new NotImplementedException();
    }

	public async Task<Income> GetByIdAsync(int id)
	{
		throw new NotImplementedException();
    }

	public async Task<int> CreateAsync(Cassete cassete)
	{
		throw new NotImplementedException();
    }

	public async Task UpdateAsync(int id, Cassete cassete)
	{
		throw new NotImplementedException();
    }

	public async Task DeleteAsync(int id)
	{
		throw new NotImplementedException();
    }
}
