using BudgetApp.Application.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Features.Budgets.Queries.GetBudgetsByAdmin
{
    public class GetBudgetsByAdminQuery : IRequest<IEnumerable<BudgetDTO>>
    {
        public string TargetUserId { get; set; } 
        public GetBudgetsByAdminQuery(string targetUserId)
        {
            TargetUserId = targetUserId;
        }
    }
}
