using AutoMapper;
using BudgetApp.Application.DTOs;
using BudgetApp.Domain.Expectations;
using BudgetApp.Domain.Interfaces;
using BudgetApp.Domain.Models;
using System;

/*public class IncomeService : IIncomeService
{
    private readonly IMainInterface<Income> _incomeRepository;
    private readonly IMapper _mapper;

    public IncomeService(IMainInterface<Income> incomeRepository, IMapper mapper)
    {
        _incomeRepository = incomeRepository;
        _mapper = mapper;
    }
    public async Task<int> CreateAsync(CreateIncomeDTO item)
    {
        var newItem = _mapper.Map<Income>(item);

        await _incomeRepository.AddAsync(newItem);

        return newItem.Id;
    }

    public async Task DeleteAsync(int id)
    {
        var rowsAffected = await _incomeRepository.Delete(id);

        if (rowsAffected == 0)
        {
            throw new NotFoundException("Income not found");
        }
    }

    public async Task<IEnumerable<IncomeDTO>> GetAllAsync()
    {
        var incomes = await _incomeRepository.GetAllAsync();
        return _mapper.Map<IEnumerable<IncomeDTO>>(incomes);
    }

    public async Task<IncomeDTO> GetByIdAsync(int id)
    {
        var income = await _incomeRepository.GetByIdAsync(id);

        if (income == null)
        {
            throw new NotFoundException($"Income with id {id} not found");
        }

        return _mapper.Map<IncomeDTO>(income);
    }

    public async Task UpdateAsync(int id, UpdateIncomeDTO dto)
    {
        var existingIncome = await _incomeRepository.GetByIdAsync(id);

        if (existingIncome == null)
        {
            throw new NotFoundException($"Income with id {id} not found");
        }

        _mapper.Map(dto, existingIncome);

        await _incomeRepository.Update(existingIncome);
    }
}*/
