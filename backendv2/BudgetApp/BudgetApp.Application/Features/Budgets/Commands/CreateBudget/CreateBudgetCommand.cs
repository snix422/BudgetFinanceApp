using MediatR;

namespace BudgetApp.Application.Features.Budgets.Commands.CreateBudget;

public record CreateBudgetCommand : IRequest<int>
{
    
        public string Title { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    
}
