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
             .NotEmpty().WithMessage("Email jest wymagany.")
             .EmailAddress().WithMessage("Niepoprawny adres e-mail");

            RuleFor(v => v.FirstName).NotEmpty().WithMessage("Imię jest wymagane");
            RuleFor(v => v.LastName).NotEmpty().WithMessage("Nazwisko jest wymagane");

            RuleFor(v => v.Password)
                .NotEmpty().WithMessage("Hasło jest wymagane")
                .MinimumLength(8).WithMessage("Hasło musi mieć co najmniej 8 znaków")
                .Matches("[A-Z]").WithMessage("Hasło musi zawierać wielką literę")
                .Matches("[a-z]").WithMessage("Hasło musi zawierać małą literę")
                .Matches("[0-9]").WithMessage("Hasło musi zawierać cyfrę");


            RuleFor(v => v.ConfirmPassword)
                .Equal(v => v.Password).WithMessage("Hasła muszą być identyczne.");
        }
    }
}
