using BudgetApp.Domain.Interfaces;
using BudgetApp.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace BudgetApp.Infrastructure.Repository
{
    public class IncomeRepository : IIncomeRepository
    {
        private readonly Context _context;

        public IncomeRepository(Context context)
        {
            _context = context;
        }

        public async Task AddAsync(Income item, CancellationToken cancellationToken = default)
        {
            _context.Incomes.Add(item);
            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task<int> Delete(int id, CancellationToken cancellationToken = default)
        {
            return await _context
                .Incomes
                .Where(i => i.Id == id)
                .ExecuteDeleteAsync(cancellationToken);
        }

        public async Task<IEnumerable<Income>> GetAllAsync(string userId, int budgetId, CancellationToken cancellationToken)
        {
            var query = _context
                .Incomes
                .Include(e => e.Budget)
                .AsNoTracking();


            query = query.Where(e => e.BudgetId == budgetId);


            if (!string.IsNullOrEmpty(userId))
            {
                query = query.Where(e => e.Budget.UserId == userId);
            }

            return await query.ToListAsync(cancellationToken);
        }

        

        public async Task<Income?> GetByIdAsync(int id, string userId, int budgetId, CancellationToken cancellationToken)
        {
            IQueryable<Income> query = _context
                .Incomes
                .Include(e => e.Budget);
                
            Console.WriteLine(id);
            var test = await _context.Incomes.Include(e => e.Budget).FirstOrDefaultAsync(b => b.Id == id, cancellationToken);
       
            query = query.Where(b => b.Id == id);

            query = query.Where(b => b.BudgetId == budgetId);


            if (!string.IsNullOrEmpty(userId))
            {
                query = query.Where(b => b.Budget.UserId == userId);
            }
           
            return await query.FirstOrDefaultAsync(cancellationToken);
            
        }

        public async Task Update(Income item, CancellationToken cancellationToken = default)
        {
            _context.Incomes.Update(item);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }

}


