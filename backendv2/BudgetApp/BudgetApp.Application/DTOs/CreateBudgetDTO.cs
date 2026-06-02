namespace BudgetApp.Application.DTOs;

public record CreateBudgetDTO
{
    public class CreateBudgetDTO
    {
        public string Title { get; set; } = string.Empty;
        public decimal TotalAmount { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
