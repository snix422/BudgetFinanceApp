using BudgetApp.Application.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Features.Budgets.Notifications
{
    public class BudgetAlertExceededNotificationHandler : INotificationHandler<BudgetAlertExceededNotification>
    {
        private readonly IEmailSender _emailSender;

        public BudgetAlertExceededNotificationHandler(IEmailSender emailSender)
        {
            _emailSender = emailSender;
        }

        public async Task Handle(BudgetAlertExceededNotification notification, CancellationToken cancellationToken)
        {
            var subject = $"Uwaga! Próg budżetu został przekroczony (Budżet ID: {notification.BudgetId})";

            var body = $@"
            Witaj,
            Informujemy, że Twój budżet osiągnął poziom {notification.CurrentPercentage}%.
            Zaloguj się do aplikacji, aby sprawdzić szczegóły.
        ";

         
            await _emailSender.SendEmailAsync(
                notification.UserEmail,
                subject,
                body,
                cancellationToken);
        }
    }
}
