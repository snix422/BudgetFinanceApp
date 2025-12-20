using BudgetApp.Application.Features.Auth.Commands.Register;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Validators
{
    public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
    {
        public RegisterCommandValidator()
        {
            RuleFor(v => v.Email)
             .NotEmpty().EmailAddress();

            RuleFor(v => v.FirstName).NotEmpty();
            RuleFor(v => v.LastName).NotEmpty();

            RuleFor(v => v.Password)
                .MinimumLength(8)
                .NotEmpty();

           
            RuleFor(v => v.ConfirmPassword)
                .Equal(v => v.Password).WithMessage("Hasła muszą być identyczne.");
        }
    }
}
