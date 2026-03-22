using BudgetApp.Application.DTOs;

namespace BudgetApp.Application.Common;

public record BudgetReportPdfModel(
    string BudgetTitle,
    IReadOnlyList<ExpenseDTO> Expenses,
    IReadOnlyDictionary<string, decimal> ExpensesByCategory);
