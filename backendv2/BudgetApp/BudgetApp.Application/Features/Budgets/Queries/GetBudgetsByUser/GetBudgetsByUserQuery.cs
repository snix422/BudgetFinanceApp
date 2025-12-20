using BudgetApp.Application.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Features.Budgets.Queries.GetBudgetsByUser
{
    public class GetBudgetsByUserQuery : IRequest<IEnumerable<BudgetDTO>>
    {
       
    }
}
