using BudgetApp.Application.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Features.Incomes.Queries.GetIncomeById
{
    public class GetIncomeByIdQuery : IRequest<IncomeDTO>
    {
        public int Id { get; set; }
        public int BugetId { get; set; }
        public GetIncomeByIdQuery(int id, int bugetId)
        {
            Id = id;
            BugetId = bugetId;
        }
    }
}
