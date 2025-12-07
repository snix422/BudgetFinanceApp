using BudgetApp.Application.DTOs;
using BudgetApp.Application.Interfaces;
using BudgetApp.Domain.Expectations;
using BudgetWebApi.Domain.Interfaces.MainInterface;
using BudgetWebApi.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Services
{
    public class ExpenseService : IExpenseService
    {
        private readonly IMainInterface<Expense> _expenseRepository;

        public ExpenseService(IMainInterface<Expense> expenseRepository)
        {
            _expenseRepository = expenseRepository;
        }
        public async Task<int> CreateAsync(CreateExpenseDTO item)
        {
            var expense = new Expense
            {
                Title = item.Title,
                Amount = item.Amount,
                Date = item.Date,
                CategoryId = item.CategoryId
            };

            await _expenseRepository.AddAsync(expense);

            return expense.Id;
        }

        public async Task DeleteAsync(int id)
        {
            var rowsAffected = await _expenseRepository.Delete(id);

            if (rowsAffected == 0)
            {
                throw new NotFoundException("Expense not found");
            }
        }

        public async Task<IEnumerable<Expense>> GetAllAsync()
        {
            var expenses =  await _expenseRepository.GetAllAsync();

            return expenses;
        }

        public async Task<Expense> GetByIdAsync(int id)
        {
            var income = await _expenseRepository.GetByIdAsync(id);

            if (income == null)
            {
                throw new NotFoundException("Income not found");
            }

            return income;
        }

        public async Task UpdateAsync(int id, UpdateExpenseDTO item)
        {
            var existingExpense = await _expenseRepository.GetByIdAsync(id);

            if (existingExpense == null)
            {
                throw new NotFoundException("Expense not found");
            }

            existingExpense.Title = item.Title;
            existingExpense.Amount = item.Amount;
            existingExpense.Date = item.Date;
            existingExpense.CategoryId = item.CategoryId;

            await _expenseRepository.Update(existingExpense);

        }
    }
}
