using BudgetWebApi.Domain.Interfaces.MainInterface;
using BudgetWebApi.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace BudgetApp.Infrastructure.Repository
{
    public class IncomeRepository : IMainInterface<Income>
    {
        private readonly Context _context;

        public IncomeRepository(Context context)
        {
            _context = context;
        }

        public async Task AddAsync(Income item)
        {
            _context.Incomes.Add(item);
            await _context.SaveChangesAsync();
        }

        public async Task<int> Delete(int id)
        {
            return await _context
                .Incomes
                .Where(i => i.Id == id)
                .ExecuteDeleteAsync();
        }

        public async Task<IEnumerable<Income>> GetAllAsync()
        {
            var incomes = await _context
                .Incomes
                .Include(i => i.Category)
                .Include(i => i.Budget)
                .Include(i => i.User)
                .AsNoTracking()
                .ToListAsync();

            return incomes;
        }

        public async Task<Income?> GetByIdAsync(int id)
        {
            var income = await _context
                .Incomes
                .Include(i => i.Category)
                .Include(i => i.Budget)
                .Include(i => i.User)
                .AsNoTracking()
                .FirstOrDefaultAsync(i => i.Id == id);

            return income;
        }

        public async Task Update(Income item)
        {
            _context.Incomes.Update(item);
            await _context.SaveChangesAsync();
        }
    }

}


