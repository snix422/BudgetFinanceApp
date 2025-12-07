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
    public class BudgetRepository : IMainInterface<Budget>
    {
        private readonly Context _context;

        public BudgetRepository(Context context)
        {
            _context = context;
        }

        public async Task AddAsync(Budget item)
        {
            _context.Budgets.Add(item);
            await _context.SaveChangesAsync();
        }

        public async Task<int> Delete(int id)
        {
            return await _context.Budgets
                .Where(i => i.Id == id)
                .ExecuteDeleteAsync();
        }

        public async Task<IEnumerable<Budget>> GetAllAsync()
        {
            var budgets = await _context
                .Budgets
                .Include(b => b.User)
                .Include(b => b.Expenses)
                    .ThenInclude(e => e.Category)
                .Include(b => b.Incomes)
                    .ThenInclude(i => i.Category)
                .AsNoTracking()
                .AsSplitQuery()
                .ToListAsync();
            
            return budgets;
        }

        public async Task<Budget?> GetByIdAsync(int id)
        {
            var budget = await _context
                .Budgets
                .Include(b => b.User)
                .Include(b => b.Expenses)
                    .ThenInclude(e => e.Category)
                .Include(b => b.Incomes)
                    .ThenInclude(i => i.Category)
                .AsNoTracking()
                .FirstOrDefaultAsync(i => i.Id == id);
            return budget;

        }

        public Task Update(Budget item)
        {
            _context.Budgets.Update(item);
            return _context.SaveChangesAsync();
        }
    }
}
