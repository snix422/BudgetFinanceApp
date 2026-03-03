using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Features.Budgets.Commands.GenerateBudgetShareToken
{
    public record GenerateBudgetShareTokenCommand(string BudgetId, string UserId) : IRequest<Guid>;
}
