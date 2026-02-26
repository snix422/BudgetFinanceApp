using BudgetApp.Application.Common;
using BudgetApp.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Interfaces
{
    public interface IAuthService
    {
        Task<Result<string>> RegisterAsync(RegisterUserDTO dto);
        Task<Result<string>> LoginAsync(LoginUserDTO dto);
    }
}
