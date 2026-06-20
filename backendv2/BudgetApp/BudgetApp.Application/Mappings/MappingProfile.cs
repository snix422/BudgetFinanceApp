using AutoMapper;
using BudgetApp.Application.DTOs;
using BudgetApp.Application.Features.Auth.Commands.Login;
using BudgetApp.Application.Features.Auth.Commands.Register;
using BudgetApp.Application.Features.Budgets.Commands.CreateBudget;
using BudgetApp.Application.Features.Expenses.Commands.CreateExpense;
using BudgetApp.Application.Features.Expenses.Commands.UpdateExpense;
using BudgetApp.Application.Features.Incomes.Commands.CreateIncome;
using BudgetApp.Application.Features.Incomes.Commands.UpdateIncome;
using BudgetApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace BudgetApp.Application.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CreateIncomeDTO, Income>();
            CreateMap<UpdateIncomeDTO, Income>();
            CreateMap<CreateExpenseDTO, Expense>();
            CreateMap<UpdateExpenseDTO, Expense>();
            CreateMap<CreateBudgetDTO, Budget>();
            CreateMap<UpdateBudgetDTO, Budget>();
            CreateMap<RegisterCommand, RegisterUserDTO>();
            CreateMap<LoginCommand, LoginUserDTO>();
            CreateMap<CreateBudgetCommand, Budget>();
            CreateMap<CreateIncomeCommand, Income>();
            CreateMap<CreateExpenseCommand, Expense>();
            CreateMap<Income, IncomeDTO>();
            CreateMap<Expense, ExpenseDTO>();
            CreateMap<Category, CategoryDTO>();
            CreateMap<UpdateIncomeCommand, Income>();
            CreateMap<UpdateExpenseCommand, Expense>();
            CreateMap<User, UserDTO>();
            CreateMap<Expense, ExpenseDTO>()
                .ForMember(dest => dest.CategoryName,
                    opt => opt.MapFrom(src => src.Category != null ? src.Category.Name : "Brak Kategorii"))
                .ForMember(dest => dest.CategoryRule,
                    opt => opt.MapFrom(src => src.Category != null ? src.Category.Rule : Domain.Enums.CategoryRule.Needs));
            CreateMap<Budget, BudgetDTO>()
                .ForMember(dest => dest.TotalSpent,
                    opt => opt.MapFrom(src => src.Expenses != null ? src.Expenses.Sum(e => e.Amount) : 0m))
                .ForMember(dest => dest.TotalEarned,
                    opt => opt.MapFrom(src => src.Incomes != null ? src.Incomes.Sum(i => i.Amount) : 0m))
                .ForMember(dest => dest.RemainingAmount,
                    opt => opt.MapFrom(src =>
                        (src.Incomes != null ? src.Incomes.Sum(i => i.Amount) : 0m) -
                        (src.Expenses != null ? src.Expenses.Sum(e => e.Amount) : 0m)
                    ));
        }
    }
}
