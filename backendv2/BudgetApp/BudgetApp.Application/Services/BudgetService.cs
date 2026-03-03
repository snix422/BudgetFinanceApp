using BudgetApp.Application.DTOs;
using BudgetApp.Application.Interfaces;
using BudgetApp.Domain.Expectations;
using BudgetWebApi.Domain.Interfaces.MainInterface;
using BudgetWebApi.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Services
{
    /*public class BudgetService : IBudgetService
    {
        private readonly IMainInterface<Budget> _budgetRepository;
        private readonly ICurrentUserService _currentUserService;

        public BudgetService(IMainInterface<Budget> budgetRepository, ICurrentUserService currentUserService)
        {
            _budgetRepository = budgetRepository;
            _currentUserService = currentUserService;
        }

        public async Task<int> CreateAsync(CreateBudgetDTO item)
        {
            var budget = new Budget
            {
                Title = item.Title,
                TotalAmount = item.TotalAmount,
                StartDate = item.StartDate,
                EndDate = item.EndDate
            };

            await _budgetRepository.AddAsync(budget);

            return budget.Id;
        }

        public async Task DeleteAsync(int id)
        {
            var rowsAffected = await _budgetRepository.Delete(id);

            if (rowsAffected == 0)
            {
                throw new NotFoundException("Budget not found");
            }
        }

        public async Task<IEnumerable<Budget>> GetAllAsync()
        {
            var budgets = await _budgetRepository.GetAllAsync();

            return budgets;
        }

        public async Task<IEnumerable<Budget>> GetMyBudgetByUserIdAsync()
        {
            var userId =  _currentUserService.UserId;
            var budgets = await _budgetRepository.GetAllAsync();
            return budgets;
        }

        public async Task<Budget> GetByIdAsync(int id)
        {
            var userId = _currentUserService.UserId;
            var budget = await _budgetRepository.GetByIdAsync(id, userId);

            return budget;
        }

        public async Task UpdateAsync(int id, UpdateBudgetDTO item)
        {
            var userId = _currentUserService.UserId;
            var existingBudget = _budgetRepository.GetByIdAsync(id,userId);

            if(existingBudget == null)
            {
                throw new NotFoundException("Budget not found");
            }

            existingBudget.Result.Title = item.Title;
            existingBudget.Result.TotalAmount = item.TotalAmount;
            existingBudget.Result.StartDate = item.StartDate;
            existingBudget.Result.EndDate = item.EndDate;

           await _budgetRepository.Update(existingBudget.Result);
        }
    }*/
}
    