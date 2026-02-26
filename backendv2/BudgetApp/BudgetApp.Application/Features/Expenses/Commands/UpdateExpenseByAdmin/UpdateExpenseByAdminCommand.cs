using BudgetApp.Application.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Features.Expenses.Commands.UpdateExpenseByAdmin
{
    public class UpdateExpenseByAdminCommand : IRequest
    {
        public int ExpenseId { get; set; }
        
        public UpdateExpenseDTO dto { get; set; }

        public UpdateExpenseByAdminCommand(int expenseId, UpdateExpenseDTO dto)
        {
            ExpenseId = expenseId;
            this.dto = dto;
        }
    }
}
