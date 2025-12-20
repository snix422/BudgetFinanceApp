using BudgetApp.Domain.Interfaces;
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
    public class ExpenseRepository : IExpenseInterface
    {
        private readonly Context _context;

        public ExpenseRepository(Context context)
        {
            _context = context;
        }

        public async Task AddAsync(Expense item, CancellationToken cancellationToken = default)
        {
            _context.Expenses.Add(item);
            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task<int> Delete(int id, CancellationToken cancellationToken = default)
        {
            return await _context.Expenses
                .Where(i => i.Id == id)
                .ExecuteDeleteAsync(cancellationToken);
        }

        public async Task<IEnumerable<Expense>> GetAllAsync(string? userId, int budgetId, CancellationToken cancellationToken = default)
        {
            var query = _context.Expenses
                .Include(e => e.Category)
                .Include(e => e.Budget)
                .AsNoTracking();

            
            query = query.Where(e => e.BudgetId == budgetId);

            
            if (!string.IsNullOrEmpty(userId))
            {
                query = query.Where(e => e.Budget.UserId == userId);
            }

            return await query.ToListAsync(cancellationToken);
        }

       

        public async Task<Expense?> GetByIdAsync(int id, string? userId, int budgetId, CancellationToken cancellationToken = default)
        {
            var query = _context
                .Expenses
                .Include(e => e.Category)
                .Include(e => e.Budget)
                .AsNoTracking();



            query = query.Where(b => b.Id == id);

            query = query.Where(b => b.BudgetId == budgetId);


            if (!string.IsNullOrEmpty(userId))
            {
                query = query.Where(b => b.Budget.UserId == userId);
            }

            return await query.FirstOrDefaultAsync(cancellationToken);

        }

        public async Task Update(Expense item, CancellationToken cancellationToken = default)
        {
            _context.Expenses.Update(item);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
