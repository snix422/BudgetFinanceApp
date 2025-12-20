using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Features.Budgets.Commands.DeleteBudget
{
    public class DeleteBudgetCommand : IRequest
    {
        public int Id { get; set; }
        public DeleteBudgetCommand(int id)
        {
            Id = id;
        }
    }
}
