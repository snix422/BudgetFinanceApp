namespace BudgetApp.Application.DTOs;

public record CreateBudgetDTO

(
    string Title,
    decimal TotalAmount,
    DateTime StartDate,
    DateTime EndDate
);
