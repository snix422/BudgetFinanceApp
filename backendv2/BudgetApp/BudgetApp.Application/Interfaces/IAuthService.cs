using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Interfaces
{
    public interface IAuthService
    {
        Task<(bool IsSuccess, string UserId, string Error)> RegisterAsync(string email, string password, string firstName, string lastName, string confirmPassword);
        Task<(bool IsSuccess, string Token, string Error)> LoginAsync(string email, string password);
    }
}
