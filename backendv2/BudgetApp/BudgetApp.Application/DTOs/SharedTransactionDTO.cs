using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.DTOs
{
    public record SharedTransactionDTO(DateTime Date, string Title, decimal Amount, string? CategoryName, bool isIncome);
}
