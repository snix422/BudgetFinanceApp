using AutoMapper;
using BudgetApp.Application.DTOs;
using BudgetWebApi.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

            CreateMap<Income, IncomeDTO>()
                .ForMember(dest => dest.CategoryName,
                opt => opt.MapFrom(src => src.Category != null ? src.Category.Name : string.Empty))

                .ForMember(dest => dest.BudgetTitle,
                opt => opt.MapFrom(src => src.Budget != null ? src.Budget.Title : string.Empty))

                .ForMember(dest => dest.TotalAmount,
                opt => opt.MapFrom(src => src.Budget != null ? src.Budget.TotalAmount : 0))

                .ForMember(dest => dest.StartDate,
                opt => opt.MapFrom(src => src.Budget != null ? src.Budget.StartDate : default))

                .ForMember(dest => dest.CategoryName,
                opt => opt.MapFrom(src => src.Budget != null ? src.Budget.EndDate : default));

            CreateMap<Expense, ExpenseDTO>()
                .ForMember(dest => dest.CategoryName,
                opt => opt.MapFrom(src => src.Category != null ? src.Category.Name : string.Empty))

                .ForMember(dest => dest.BudgetTitle,
                opt => opt.MapFrom(src => src.Budget != null ? src.Budget.Title : string.Empty))

                .ForMember(dest => dest.TotalAmount,
                opt => opt.MapFrom(src => src.Budget != null ? src.Budget.TotalAmount : 0))

                .ForMember(dest => dest.StartDate,
                opt => opt.MapFrom(src => src.Budget != null ? src.Budget.StartDate : default))

                .ForMember(dest => dest.CategoryName,
                opt => opt.MapFrom(src => src.Budget != null ? src.Budget.EndDate : default));

            CreateMap<Budget, BudgetDTO>()
           
            .ForMember(dest => dest.UserName,
                opt => opt.MapFrom(src => src.User != null ? src.User.Name : string.Empty))

            .ForMember(dest => dest.Expenses, opt => opt.MapFrom(src => src.Expenses))
            .ForMember(dest => dest.Incomes, opt => opt.MapFrom(src => src.Incomes))

            .ForMember(dest => dest.TotalSpent,
                opt => opt.MapFrom(src => src.Expenses != null ? src.Expenses.Sum(e => e.Amount) : 0m))

            .ForMember(dest => dest.TotalEarned,
                opt => opt.MapFrom(src => src.Incomes != null ? src.Incomes.Sum(i => i.Amount) : 0m))

            .ForMember(dest => dest.RemainingAmount,
                opt => opt.MapFrom(src => src.TotalAmount - (src.Expenses != null ? src.Expenses.Sum(e => e.Amount) : 0m)));



        }
    }
}
