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

namespace BudgetApp.Application.Features.Auth.Commands.Register
{
    public class RegisterCommandHandler : IRequestHandler<RegisterCommand, Result<string>>
    {
        private readonly IAuthService _authService;
        private readonly IMapper _mapper;

        public RegisterCommandHandler(IAuthService authService, IMapper mapper)
        {
            _authService = authService;
            _mapper = mapper;
        }

        public async Task<Result<string>> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            var registerDTO = _mapper.Map<RegisterUserDTO>(request);

            var result = await _authService.RegisterAsync(registerDTO);

            return result;
        }

    }
}
