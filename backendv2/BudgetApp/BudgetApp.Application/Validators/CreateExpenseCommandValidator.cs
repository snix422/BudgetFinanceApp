using BudgetApp.Application.Features.Expenses.Commands.CreateExpense;
using BudgetApp.Domain.Interfaces;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Validators
{
    public class CreateExpenseCommandValidator : AbstractValidator<CreateExpenseCommand>
    {
        private readonly IBudgetRepository _budgetRepository;

        public CreateExpenseCommandValidator(IBudgetRepository budgetRepository )
        {
            _budgetRepository = budgetRepository;

            RuleFor(x => x)
                .MustAsync(BeWithinBudgetDates)
                .WithMessage("Data wydatku musi mieścić się w ramach czasowych budżetu");
        }

        private async Task<bool> BeWithinBudgetDates(CreateExpenseCommand command, CancellationToken cancellationToken)
        {
            var budget = await _budgetRepository.GetByIdAsync(command.BudgetId, null, cancellationToken);

            if(budget == null)
            {
                return false;
            }

            var expenseDate = command.Date;

            return expenseDate >= budget.StartDate && expenseDate <= budget.EndDate;
        }

       
    }
}
