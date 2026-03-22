using BudgetApp.Application.Common;
using BudgetApp.Application.Interfaces;
using QuestPDF.Fluent;

namespace BudgetApp.Infrastructure.Reporting;

public class BudgetPdfReportGenerator : IBudgetPdfReportGenerator
{
    public Task<FileExportResult> GenerateAsync(BudgetReportPdfModel model, CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();

        byte[] chartImageBytes = ChartGenerator.GenerateExpensesPieChart(model.ExpensesByCategory);
        var expenses = model.Expenses.ToList();
        var layout = new BudgetReportLayoutModel(model.BudgetTitle, expenses, chartImageBytes);
        var document = new BudgetReportDocument(layout);
        byte[] pdfBytes = document.GeneratePdf();

        var safeTitle = string.Join("_", model.BudgetTitle.Split(Path.GetInvalidFileNameChars()));
        var fileName = $"raport_{safeTitle}_{DateTime.UtcNow:yyyyMMdd}.pdf";

        return Task.FromResult(new FileExportResult(
            Content: pdfBytes,
            ContentType: "application/pdf",
            FileName: fileName));
    }
}
