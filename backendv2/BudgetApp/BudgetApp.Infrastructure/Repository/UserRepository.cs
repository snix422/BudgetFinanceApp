using AutoMapper;
using BudgetApp.Domain.Interfaces;
using BudgetApp.Infrastructure.Identity;
using BudgetApp.Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Infrastructure.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly Context _context;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;

        public UserRepository(Context context, IMapper mapper, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _mapper = mapper;
            _userManager = userManager;
        }

        public async Task<IEnumerable<User>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var appUsers = await _userManager.Users.ToListAsync(cancellationToken);
            var users = new List<User>();
            foreach (var appUser in appUsers)
            {
                var roles = await _userManager.GetRolesAsync(appUser);
                var role = roles.FirstOrDefault() ?? "User";
                users.Add(new User
                {
                    Id = appUser.Id,
                    Email = appUser.Email,
                    FirstName = appUser.FirstName,
                    RoleName = role
                });
            }
            return users;
        }

        public async Task<User?> GetByIdAsync(string id, CancellationToken cancellationToken = default)
        {
            var appUser = await _userManager.FindByIdAsync(id);
            Console.WriteLine(appUser);
            if (appUser == null) return null;

            
            var roles = await _userManager.GetRolesAsync(appUser);
            Console.WriteLine(roles);
            var role = roles.FirstOrDefault() ?? "User";

            
            return new User
            {
                Id = appUser.Id,
                Email = appUser.Email,
                FirstName = appUser.FirstName,
                RoleName = role
            };
        }
    }
}
