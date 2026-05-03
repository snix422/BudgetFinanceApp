using BudgetApp.Application.Features.Budgets.Commands.SendingBudgetSummaries;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Infrastructure.BackgroundJobs
{
    public class BudgetSummaryJob
    {
        private readonly IMediator _mediator;

        public BudgetSummaryJob(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task ExecuteAsync()
        {
            await _mediator.Send(new SendingBudgetSummariesCommand());
        }
    }
}
