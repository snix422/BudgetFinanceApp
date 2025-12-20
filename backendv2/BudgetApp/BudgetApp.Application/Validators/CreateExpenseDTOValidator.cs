using BudgetApp.Application.DTOs;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Validators
{
    public class CreateExpenseDTOValidator : AbstractValidator<CreateExpenseDTO>
    {
        public CreateExpenseDTOValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title is required.")
                .MinimumLength(3).WithMessage("Title must be at least 3 characters long.")
                .MaximumLength(100).WithMessage("Title cannot exceed 100 characters.");
            RuleFor(x => x.Amount)
                .GreaterThan(0).WithMessage("Amount must be greater than zero.");
            RuleFor(x => x.Date)
                .LessThanOrEqualTo(DateTime.Now).WithMessage("Date cannot be in the future.");
            RuleFor(x => x.CategoryId)
                .GreaterThan(0).WithMessage("CategoryId must be a positive integer.");
        }
    }
}
