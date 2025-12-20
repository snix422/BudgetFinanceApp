using BudgetApp.Application.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Infrastructure.Identity
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;

        public AuthService(UserManager<ApplicationUser> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }

        public async Task<(bool IsSuccess, string UserId, string Error)> RegisterAsync(string email, string password, string firstName, string lastName, string confirmPassword)
        {
            var existingUser = await _userManager.FindByEmailAsync(email);
            if (existingUser != null)
            {
                return (false, null, "Użytkownik o takim adresie email już istnieje.");
            }
            var user = new ApplicationUser
            {
                UserName = email,
                Email = email,
                FirstName = firstName, 
                LastName = lastName   
            };

            var result = await _userManager.CreateAsync(user, password);

            if (!result.Succeeded)
            {
                var error = string.Join(", ", result.Errors.Select(e => e.Description));
                return (false, null, error);
            }

            var roleResult = await _userManager.AddToRoleAsync(user, "User");

            if (!roleResult.Succeeded)
            {
                // Opcjonalnie: Logowanie błędu, że user powstał, ale bez roli
                // Lub rollback (jeśli używasz transakcji, choć UserManager nie wspiera transakcji wprost w jednej metodzie)
            }

            return (true, user.Id, null);
        }

        public async Task<(bool IsSuccess, string Token, string Error)> LoginAsync(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) return (false, null, "Invalid credentials");
            var isValidPassword = await _userManager.CheckPasswordAsync(user, password);
            if (!isValidPassword) return (false, null, "Invalid credentials");

            var token = GenerateJwtToken(user);
            return (true, token, null);
        }

        private string GenerateJwtToken(ApplicationUser user)
        {
            var claims = new List<Claim> 
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.Id),
                new Claim(JwtRegisteredClaimNames.Email, user.Email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
};
