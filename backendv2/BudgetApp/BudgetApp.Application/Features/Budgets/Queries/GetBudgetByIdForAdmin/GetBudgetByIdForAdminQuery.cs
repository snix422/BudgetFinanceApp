using BudgetApp.Application.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Features.Budgets.Queries.GetBudgetByIdForAdmin
{
    public class GetBudgetByIdForAdminQuery : IRequest<BudgetDTO>
    {
        public string UserId { get; }
        public int BudgetId { get; }
        public GetBudgetByIdForAdminQuery(string userId, int budgetId)
        {
            UserId = userId;
            BudgetId = budgetId;
        }
    }
}
