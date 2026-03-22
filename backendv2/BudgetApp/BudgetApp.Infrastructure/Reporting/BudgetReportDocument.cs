using BudgetApp.Application.DTOs;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace BudgetApp.Infrastructure.Reporting;

internal record BudgetReportLayoutModel(string BudgetName, List<ExpenseDTO> Expenses, byte[] ChartImage);

internal sealed class BudgetReportDocument : IDocument
{
    private readonly BudgetReportLayoutModel _model;

    public BudgetReportDocument(BudgetReportLayoutModel model)
    {
        _model = model;
    }

    private TextStyle TitleStyle => TextStyle.Default.FontSize(20).SemiBold().FontColor(Colors.Blue.Darken2);
    private TextStyle HeaderStyle => TextStyle.Default.FontSize(12).SemiBold();
    private TextStyle NormalStyle => TextStyle.Default.FontSize(10);

    private IContainer CellStyle(IContainer container) =>
        container.BorderBottom(1).BorderColor(Colors.Grey.Lighten2).PaddingVertical(5);

    public void Compose(IDocumentContainer container)
    {
        container
            .Page(page =>
            {
                page.Margin(2, Unit.Centimetre);
                page.DefaultTextStyle(NormalStyle);

                page.Header().Element(ComposeHeader);
                page.Content().Element(ComposeContent);
                page.Footer().AlignCenter().Text(x =>
                {
                    x.Span("Strona ");
                    x.CurrentPageNumber();
                });
            });
    }

    private void ComposeHeader(IContainer container)
    {
        container.Row(row =>
        {
            row.RelativeItem().Column(column =>
            {
                column.Item().Text("Raport Budżetowy").Style(TitleStyle);
                column.Item().Text($"Budżet: {_model.BudgetName}").FontSize(14);
                column.Item().Text($"Wygenerowano: {DateTime.Now:g}");
            });
        });
    }

    private void ComposeContent(IContainer container)
    {
        container.PaddingVertical(20).Column(column =>
        {
            column.Item().Text("Analiza Wydatków (Wykres)").Style(HeaderStyle);
            column.Item().PaddingBottom(20).AlignCenter().Image(_model.ChartImage).FitWidth();

            column.Item().Text("Szczegóły Transakcji").Style(HeaderStyle);
            column.Item().Element(ComposeTable);
        });
    }

    private void ComposeTable(IContainer container)
    {
        container.Table(table =>
        {
            table.ColumnsDefinition(columns =>
            {
                columns.RelativeColumn(2);
                columns.RelativeColumn(3);
                columns.RelativeColumn(2);
                columns.RelativeColumn(1);
            });

            table.Header(header =>
            {
                header.Cell().Text("Data").Style(HeaderStyle);
                header.Cell().Text("Opis").Style(HeaderStyle);
                header.Cell().Text("Kategoria").Style(HeaderStyle);
                header.Cell().AlignRight().Text("Kwota").Style(HeaderStyle);
                header.Cell().ColumnSpan(4).PaddingBottom(5).BorderBottom(2).BorderColor(Colors.Black);
            });

            foreach (var expense in _model.Expenses)
            {
                table.Cell().Element(CellStyle).Text($"{expense.Date:dd.MM.yyyy}");
                table.Cell().Element(CellStyle).Text(expense.Title);
                table.Cell().Element(CellStyle).Text(expense.CategoryName);
                table.Cell().Element(CellStyle).AlignRight().Text($"{expense.Amount:C}");
            }
        });
    }
}
