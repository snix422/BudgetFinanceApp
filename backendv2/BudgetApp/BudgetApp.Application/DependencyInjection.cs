using BudgetApp.Application.Behaviors;
using BudgetApp.Application.Interfaces;
using BudgetApp.Application.Services;
using BudgetApp.Domain.Interfaces;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            // Register application services here
            //services.AddScoped<IBudgetService, BudgetService>();
            //services.AddScoped<IExpenseService, ExpenseService>();
            //services.AddScoped<IIncomeService, IncomeService>();
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            // Rejestracja MediatR wraz z naszym nowym Behavior
            services.AddMediatR(cfg => {
                cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly());

                // TĄ LINIJKĘ DODAJEMY: Podpinamy naszego strażnika
                cfg.AddOpenBehavior(typeof(ValidationBehavior<,>));
            });
            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
            services.AddFluentValidationAutoValidation();
            return services;
        }
    }
}
