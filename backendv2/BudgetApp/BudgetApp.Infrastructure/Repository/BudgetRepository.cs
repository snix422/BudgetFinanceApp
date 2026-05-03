using BudgetApp.Application.Features.Budgets.Queries.GetSharedBudget;
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
    public class BudgetRepository : IBudgetRepository
    {
        private readonly Context _context;

        public BudgetRepository(Context context)
        {
            _context = context;
        }

        public async Task AddAsync(Budget item, CancellationToken cancellationToken = default)
        {
            _context.Budgets.Add(item);
            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task<int> Delete(int id, CancellationToken cancellationToken = default)
        {
            return await _context.Budgets
                .Where(i => i.Id == id)
                .ExecuteDeleteAsync(cancellationToken);
        }

        public async Task<IEnumerable<Budget>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var budgets = await _context
                .Budgets
                .Include(b => b.Expenses)
                    .ThenInclude(e => e.Category)
                .Include(b => b.Incomes)
                .AsNoTracking()
                .AsSplitQuery()
                .ToListAsync(cancellationToken);
            
            return budgets;
        }

        public async Task<IEnumerable<Budget>> GetAllByUserIdAsync(string userId, CancellationToken cancellationToken = default)
        {
            var budgets = await _context
                .Budgets
                .Where(b => b.UserId == userId)
                .Include(b => b.Expenses)
                    .ThenInclude(e => e.Category)
                .Include(b => b.Incomes)
                .AsNoTracking()
                .AsSplitQuery()
                .ToListAsync(cancellationToken);

            return budgets;
        }

        public async Task<Budget?> GetByIdAsync(int id, string? userId = null, CancellationToken cancellationToken = default)
        {
            var query = _context.Budgets
                .Include(b => b.Expenses)
                    .ThenInclude(e => e.Category)
                .Include(b => b.Incomes)
                .AsNoTracking()
                .AsSplitQuery();


           
            query = query.Where(b => b.Id == id);

           
            if (!string.IsNullOrEmpty(userId))
            {
                query = query.Where(b => b.UserId == userId);
            }

            return await query.FirstOrDefaultAsync(cancellationToken);

        }

        public async Task<Budget?> GetByShareTokenAsync(Guid token, CancellationToken cancellationToken = default)
        {
            var budget = await _context.Budgets
                .Include(b => b.Expenses)
                    .ThenInclude(e => e.Category)
                .Include(b => b.Incomes)
                .AsNoTracking()
                .AsSplitQuery()
                .FirstOrDefaultAsync(b => b.ShareToken == token ,cancellationToken);
            return budget;
        }

        public async Task<IEnumerable<Budget>> GetBudgetsAwaitingSummaryAsync(CancellationToken cancellationToken)
        {
            var today = DateTime.UtcNow.Date.AddDays(-1);

            return await _context.Budgets
                .Include(b => b.Expenses)
                    .ThenInclude(e => e.Category)
                .Include(b => b.Incomes)
                .Where(b => b.EndDate.Date <= today && !b.IsSummaryEmailSent)
                .ToListAsync(cancellationToken);
        }

        public Task Update(Budget item, CancellationToken cancellationToken = default)
        {
            _context.Budgets.Update(item);
            return _context.SaveChangesAsync(cancellationToken);
        }
    }
}
