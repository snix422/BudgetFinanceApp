using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.DTOs
{
    public record SharedBudgetDTO(string Name, decimal TotalIncomes, decimal TotalExpenses, List<SharedTransactionDTO> Transactions);
}
