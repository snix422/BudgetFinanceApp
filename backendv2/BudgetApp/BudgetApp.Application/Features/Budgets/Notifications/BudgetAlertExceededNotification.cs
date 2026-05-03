using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Features.Budgets.Notifications
{
    public record BudgetAlertExceededNotification(int BudgetId, decimal CurrentPercentage, string UserEmail) : INotification;

}
