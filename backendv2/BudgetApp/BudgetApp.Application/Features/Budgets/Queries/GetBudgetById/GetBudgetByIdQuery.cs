using BudgetApp.Application.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Features.Budgets.Queries.GetBudgetById
{
    public class GetBudgetByIdQuery : IRequest<BudgetDTO>
    {
        public int Id { get; set; }
        public GetBudgetByIdQuery(int id)
        {
            Id = id;
        }   
    }
}
