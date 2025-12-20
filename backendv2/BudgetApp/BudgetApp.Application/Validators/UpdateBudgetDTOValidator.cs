using BudgetApp.Application.DTOs;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Validators
{
    public class UpdateBudgetDTOValidator : AbstractValidator<UpdateBudgetDTO>
    {
        public UpdateBudgetDTOValidator()
        {
            RuleFor(b => b.Title)
                .NotEmpty().WithMessage("Title is required.")
                .MinimumLength(3).WithMessage("Title must be at least 3 characters long.")
                .MaximumLength(100).WithMessage("Title cannot exceed 100 characters.");
            RuleFor(b => b.TotalAmount)
                .GreaterThan(0).WithMessage("Total amount must be greater than zero.");
            RuleFor(b => b.StartDate)
                .LessThan(b => b.EndDate).WithMessage("Start date must be earlier than end date.")
                .GreaterThanOrEqualTo(DateTime.Today).WithMessage("Start date cannot be in the past.");
            RuleFor(b => b.EndDate)
                .GreaterThan(b => b.StartDate).WithMessage("End date must be later than start date.");
        }
    }
}
