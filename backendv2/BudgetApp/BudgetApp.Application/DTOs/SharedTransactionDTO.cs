namespace BudgetApp.Application.DTOs;

public record SharedTransactionDTO(DateTime Date, string Title, decimal Amount, string? CategoryName, bool isIncome);
