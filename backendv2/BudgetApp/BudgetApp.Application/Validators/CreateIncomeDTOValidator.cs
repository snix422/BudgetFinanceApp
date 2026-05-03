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
                .NotEmpty().WithMessage("Tytuł jest wymagany")
                .MinimumLength(3).WithMessage("Tytuł musi być min. 3 znaków")
                .MaximumLength(100).WithMessage("Tytuł nie może przekraczać 100 znaków");
            RuleFor(x => x.Amount)
                .GreaterThan(0).WithMessage("Kwota musi być większa niż 0");
            RuleFor(x => x.Date)
                .LessThanOrEqualTo(DateTime.Now).WithMessage("Wybrana data nie może być z przyszłości");
           
        }
    }
}
