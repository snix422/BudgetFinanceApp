using AutoMapper;
using BudgetApp.Application.DTOs;
using BudgetApp.Application.Interfaces;
using BudgetApp.Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Features.Budgets.Commands.SendingBudgetSummaries
{
    public class SendingBudgetSummariesHandler : IRequestHandler<SendingBudgetSummariesCommand>
    {
        private readonly IBudgetRepository _budgetRepository;
        private readonly IEmailSender _emailSercice;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;

        public SendingBudgetSummariesHandler(IBudgetRepository budgetRepository, IEmailSender emailService, IMapper mapper, IUserRepository userRepository) 
        {
            _budgetRepository = budgetRepository;
            _emailSercice = emailService;
            _mapper = mapper;
            _userRepository = userRepository;
        }

        public async Task Handle(SendingBudgetSummariesCommand request, CancellationToken cancellationToken)
        {
            var budgetsToProcess = await _budgetRepository.GetBudgetsAwaitingSummaryAsync(cancellationToken);

            if (!budgetsToProcess.Any()) return;

            //var budgetsToProcessDTO = _mapper.Map<List<BudgetDTO>>(budgetsToProcess);
          

            foreach (var budget in budgetsToProcess)
            {
                var user = await _userRepository.GetByIdAsync(budget.UserId, cancellationToken);

                if (user == null || string.IsNullOrWhiteSpace(user.Email))
                {
                    continue;
                }

                var totalEarned = budget.Incomes.Sum(i => i.Amount);
                var totelSpent = budget.Expenses.Sum(e => e.Amount);
                var remainingAmount = totalEarned - totelSpent;

                var subject = $"Podsumowanie budżetu: {budget.Title}";
                var body = $"Twój budżet się zakończył. Oto podsumowanie:\n" +
                           $"- Kwota wpływów: {totalEarned}\n" +
                           $"- Kwota wydatków: {totelSpent}\n" +
                           $"- Kwota oszczędności: {remainingAmount}\n" +
                           $"- Data rozpoczęcia: {budget.StartDate:d}\n" +
                           $"- Data zakończenia: {budget.EndDate:d}\n" +
                           $"Dziękujemy za korzystanie z naszej aplikacji!";

                try
                {
                    await _emailSercice.SendEmailAsync(user.Email, subject, body, cancellationToken);

                    budget.IsSummaryEmailSent = true;

                    await _budgetRepository.Update(budget, cancellationToken);

                }catch(Exception ex)
                {
                    // Log the exception (you can use a logging framework like Serilog, NLog, etc.)
                    Console.WriteLine($"Failed to send email for budget {budget.Id}: {ex.Message}");
                }
            }

           
        }
    }
}
