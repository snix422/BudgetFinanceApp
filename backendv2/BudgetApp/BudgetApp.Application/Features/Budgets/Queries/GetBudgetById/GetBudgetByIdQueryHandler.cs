using AutoMapper;
using BudgetApp.Application.DTOs;
using BudgetApp.Application.Interfaces;
using BudgetApp.Domain.Interfaces;
using BudgetWebApi.Domain.Interfaces.MainInterface;
using BudgetWebApi.Domain.Models;
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
        private readonly IBudgetInterface _repository;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public GetBudgetByIdQueryHandler(IBudgetInterface repository, IMapper mapper, ICurrentUserService currentUserService)
        {
            _repository = repository;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task<BudgetDTO> Handle(GetBudgetByIdQuery request, CancellationToken cancellationToken)
        {
            Budget? budget;
            var userRole = _currentUserService.UserRole;
            var userId = _currentUserService.UserId;
            var userIdFilter = userRole == "Admin" ? null : userId;

            budget = await _repository.GetByIdAsync(request.Id, userIdFilter, cancellationToken);
            
            if (budget == null)
            {
                throw new KeyNotFoundException($"Budget with id {request.Id} not found");
            }
            return _mapper.Map<BudgetDTO>(budget);
        }

    }
}
