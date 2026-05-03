using BudgetApp.Application.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Features.Budgets.Notifications
{
    public class SendEmailOnBudgetAlertHandler : INotificationHandler<BudgetAlertExceededNotification>
    {
        private readonly IEmailSender _emailSender;

        public SendEmailOnBudgetAlertHandler(IEmailSender emailSender)
        {
            _emailSender = emailSender;
        }

        public async Task Handle(BudgetAlertExceededNotification notification, CancellationToken cancellationToken)
        {
            var percent = notification.CurrentPercentage.ToString("F0"); ;

            var htmlMessage = $@"
            <div style='font-family: Arial; padding: 20px; border: 1px solid #ccc; border-radius: 5px;'>
                <h2 style='color: #d9534f;'>Uwaga na wydatki! 🚨</h2>
                <p>Twój budżet przekroczył bezpieczną granicę.</p>
                <p>Wydałeś już <strong>{percent}%</strong> dostępnych środków.</p>
                <p>Czas lekko przyhamować z przyjemnościami, żeby zrealizować cel oszczędnościowy!</p>
            </div>";

            await _emailSender.SendEmailAsync(
                toEmail: notification.UserEmail,
                subject: "⚠️ Przekroczono 80% budżetu miesięcznego!",
                htmlBody: htmlMessage,
                cancellationToken
                );
        }
    }
}
