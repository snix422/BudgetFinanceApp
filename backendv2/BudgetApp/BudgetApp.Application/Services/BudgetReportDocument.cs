using BudgetApp.Application.DTOs;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Services
{
    public record BudgetReportModel(string BudgetName, List<ExpenseDTO> Expenses, byte[] ChartImage);
    public class BudgetReportDocument : IDocument
    {
        private readonly BudgetReportModel _model;

        public BudgetReportDocument(BudgetReportModel model)
        {
            _model = model;
        }

        TextStyle TitleStyle => TextStyle.Default.FontSize(20).SemiBold().FontColor(Colors.Blue.Darken2);
        TextStyle HeaderStyle => TextStyle.Default.FontSize(12).SemiBold();
        TextStyle NormalStyle => TextStyle.Default.FontSize(10);
        IContainer CellStyle(IContainer container) => container.BorderBottom(1).BorderColor(Colors.Grey.Lighten2).PaddingVertical(5);

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

        public void ComposeHeader(IContainer container)
        {
            container.Row(row =>
            {
                row.RelativeItem().Column(column =>
                {
                    column.Item().Text($"Raport Budżetowy").Style(TitleStyle);
                    column.Item().Text($"Budżet: {_model.BudgetName}").FontSize(14);
                    column.Item().Text($"Wygenerowano: {DateTime.Now:g}");
                });
                // Tu można dodać logo firmy w rogu
                // row.ConstantItem(100).Image("logo.png"); 
            });
        }

        public void ComposeContent(IContainer container)
        {
            container.PaddingVertical(20).Column(column =>
            {
                // 1. Wstawienie WYKRESU
                column.Item().Text("Analiza Wydatków (Wykres)").Style(HeaderStyle);
                column.Item().PaddingBottom(20).AlignCenter().Image(_model.ChartImage).FitWidth();

                // 2. Wstawienie TABELI
                column.Item().Text("Szczegóły Transakcji").Style(HeaderStyle);
                column.Item().Element(ComposeTable);
            });
        }

        public void ComposeTable(IContainer container)
        {
            container.Table(table =>
            {
                // Definicja kolumn
                table.ColumnsDefinition(columns =>
                {
                    columns.RelativeColumn(2); // Data
                    columns.RelativeColumn(3); // Opis
                    columns.RelativeColumn(2); // Kategoria
                    columns.RelativeColumn(1); // Kwota
                });

                // Nagłówek tabeli
                table.Header(header =>
                {
                    header.Cell().Text("Data").Style(HeaderStyle);
                    header.Cell().Text("Opis").Style(HeaderStyle);
                    header.Cell().Text("Kategoria").Style(HeaderStyle);
                    header.Cell().AlignRight().Text("Kwota").Style(HeaderStyle);
                    header.Cell().ColumnSpan(4).PaddingBottom(5).BorderBottom(2).BorderColor(Colors.Black);
                });

                // Wiersze z danymi
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
}
