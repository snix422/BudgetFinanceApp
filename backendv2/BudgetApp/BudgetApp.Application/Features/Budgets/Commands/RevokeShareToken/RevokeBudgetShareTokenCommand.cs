using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Features.Budgets.Commands.RevokeShareToken
{
    public record RevokeBudgetShareTokenCommand(string BudgetId, string UserId) : IRequest;
}
