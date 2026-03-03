using BudgetApp.Application.Common;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Features.Budgets.Queries.ExportBudget
{
   
    public record ExportBudgetToPdfQuery(string BudgetId) : IRequest<FileExportResult>;
    
}
