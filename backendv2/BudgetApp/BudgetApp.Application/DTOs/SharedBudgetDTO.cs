namespace BudgetApp.Application.DTOs;

public record SharedBudgetDTO(string Name, decimal TotalIncomes, decimal TotalExpenses, List<SharedTransactionDTO> Transactions);
