using BudgetWebApi.Domain.Interfaces.MainInterface;
using BudgetWebApi.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Infrastructure.Repository
{
    public class ExpenseRepository : IMainInterface<Expense>
    {
        private readonly Context _context;

        public ExpenseRepository(Context context)
        {
            _context = context;
        }

        public async Task AddAsync(Expense item)
        {
            _context.Expenses.Add(item);
            await _context.SaveChangesAsync();
        }

        public async Task<int> Delete(int id)
        {
            return await _context.Expenses
                .Where(i => i.Id == id)
                .ExecuteDeleteAsync();
        }

        public async Task<IEnumerable<Expense>> GetAllAsync()
        {
            var incomes = await _context
                .Expenses
                .Include(e => e.Category)
                .Include(e => e.Budget)
                .Include(e => e.User)
                .AsNoTracking()
                .ToListAsync();

            return incomes;
        }

        public async Task<Expense?> GetByIdAsync(int id)
        {
            var income = await _context
                .Expenses
                .Include(e => e.Category)
                .Include(e => e.Budget)
                .Include(e => e.User)
                .AsNoTracking()
                .FirstOrDefaultAsync(i => i.Id == id);

            return income;
        }

        public async Task Update(Expense item)
        {
            _context.Expenses.Update(item);
            await _context.SaveChangesAsync();
        }
    }
}
