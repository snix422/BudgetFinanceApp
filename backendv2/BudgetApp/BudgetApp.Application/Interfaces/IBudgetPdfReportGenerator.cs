using BudgetApp.Application.Common;

namespace BudgetApp.Application.Interfaces;

public interface IBudgetPdfReportGenerator
{
    Task<FileExportResult> GenerateAsync(BudgetReportPdfModel model, CancellationToken cancellationToken = default);
}
