using BudgetApp.Application.DTOs;
using BudgetApp.Domain.Models;
using System;

public interface IIncomeService
{
    Task<IEnumerable<IncomeDTO>> GetAllAsync();
    Task<IncomeDTO> GetByIdAsync(int id);
    Task<int> CreateAsync(CreateIncomeDTO item);
    Task UpdateAsync(int id, UpdateIncomeDTO item);
    Task DeleteAsync(int id);
}
