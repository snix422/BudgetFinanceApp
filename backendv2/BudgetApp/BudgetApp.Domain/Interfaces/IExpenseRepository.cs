using BudgetApp.Domain.Interfaces;
using BudgetApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Domain.Interfaces
{
    public interface IExpenseRepository : ITransactionInterface<Expense>
    {
        
    }
}
