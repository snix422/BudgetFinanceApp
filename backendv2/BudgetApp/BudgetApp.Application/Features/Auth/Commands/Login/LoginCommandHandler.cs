using AutoMapper;
using BudgetApp.Application.Common;
using BudgetApp.Application.DTOs;
using BudgetApp.Application.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Features.Auth.Commands.Login
{
    public class LoginCommandHandler : IRequestHandler<LoginCommand, Result<string>>
    {
        private readonly IAuthService _authService;
        private readonly IMapper _mapper;

        public LoginCommandHandler(IAuthService authService, IMapper mapper)
        {
            _authService = authService;
            _mapper = mapper;
        }

        public async Task<Result<string>> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            var loginUserDTO = _mapper.Map<LoginUserDTO>(request);

            var result = await _authService.LoginAsync(loginUserDTO);

            return result;
        }
    }
}
