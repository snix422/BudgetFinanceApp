using AutoMapper;
using BudgetApp.Application.DTOs;
using BudgetApp.Application.Interfaces;
using BudgetApp.Domain.Expectations;
using BudgetApp.Domain.Interfaces;
using BudgetApp.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Features.Budgets.Queries.GetBudgetById
{
    public class GetBudgetByIdQueryHandler : IRequestHandler<GetBudgetByIdQuery, BudgetDTO>
    {
        private readonly IBudgetRepository _repository;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public GetBudgetByIdQueryHandler(IBudgetRepository repository, IMapper mapper, ICurrentUserService currentUserService)
        {
            _repository = repository;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task<BudgetDTO> Handle(GetBudgetByIdQuery request, CancellationToken cancellationToken)
        {
            
            var userId = _currentUserService.UserId ?? throw new UnauthorizedException("User is not authenticated.");
            var isAdmin = _currentUserService.UserRole == "Admin";

            var budget = isAdmin 
                ? await _repository.GetByIdAsync(request.Id, null,  cancellationToken) 
                : await _repository.GetByIdAsync(request.Id, userId, cancellationToken);  
            
            if (budget == null)
            {
                throw new NotFoundException($"Budget with id {request.Id} not found");
            }
            return _mapper.Map<BudgetDTO>(budget);
        }

    }
}
