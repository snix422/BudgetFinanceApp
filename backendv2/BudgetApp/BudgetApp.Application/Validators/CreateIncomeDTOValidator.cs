using BudgetApp.Application.DTOs;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Validators
{
    public class CreateIncomeDTOValidator : AbstractValidator<CreateIncomeDTO>
    {
        public CreateIncomeDTOValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title is required.")
                .MinimumLength(3).WithMessage("Title must be at least 3 characters long.")
                .MaximumLength(100).WithMessage("Title must not exceed 100 characters.");
            RuleFor(x => x.Amount)
                .GreaterThan(0).WithMessage("Amount must be greater than zero.");
            RuleFor(x => x.Date)
                .LessThanOrEqualTo(DateTime.Now).WithMessage("Date cannot be in the future.");
           
        }
    }
}
