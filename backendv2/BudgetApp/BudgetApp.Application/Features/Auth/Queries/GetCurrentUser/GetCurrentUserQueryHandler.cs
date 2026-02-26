using AutoMapper;
using BudgetApp.Application.DTOs;
using BudgetApp.Application.Features.Auth.Queries.CurrentUser;
using BudgetApp.Application.Interfaces;
using BudgetApp.Domain.Expectations;
using BudgetApp.Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Features.Auth.Queries.GetCurrentUser
{
    public class GetCurrentUserQueryHandler : IRequestHandler<GetCurrentUserQuery, UserDTO>
    {
        private readonly ICurrentUserService _currentUserService;
        private readonly IUserRepository _repository;
        private readonly IMapper _mapper;

        public GetCurrentUserQueryHandler(ICurrentUserService currentUserService, IUserRepository repository, IMapper mapper)
        {
            _currentUserService = currentUserService;
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<UserDTO> Handle(GetCurrentUserQuery request, CancellationToken cancellationToken)
        {
            var userId = _currentUserService.UserId;

            if (userId == null) 
            {
                throw new UnauthorizedException("Użytkownik nie jest zalogowany");
            }

            var userEntity = await _repository.GetByIdAsync(userId, cancellationToken);
            Console.WriteLine(userEntity);
            if (userEntity == null) 
            {
                throw new UnauthorizedException("Użytkownik nie jest zalogowany");
            }

            var userDTO = _mapper.Map<UserDTO>(userEntity);
            Console.WriteLine(userDTO);
            return userDTO;
        }
    }
}
