using BudgetApp.Application.Common;
using MediatR;

namespace BudgetApp.Application.Features.Budgets.Queries.ExportBudget;

public record ExportBudgetToPdfQuery(string BudgetId) : IRequest<FileExportResult>;
