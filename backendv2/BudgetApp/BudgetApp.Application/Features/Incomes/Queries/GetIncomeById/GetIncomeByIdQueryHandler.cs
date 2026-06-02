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

namespace BudgetApp.Application.Features.Incomes.Queries.GetIncomeById
{
    public class GetIncomeByIdQueryHandler : IRequestHandler<GetIncomeByIdQuery, IncomeDTO>
    {
        private readonly IIncomeRepository _repository;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public GetIncomeByIdQueryHandler(IIncomeRepository repository, IMapper mapper, ICurrentUserService currentUserService)
        {
            _repository = repository;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task<IncomeDTO> Handle(GetIncomeByIdQuery request, CancellationToken cancellationToken)
        {
            Income? income;
            var userRole = _currentUserService.UserRole;
            var userId = _currentUserService.UserId;
            string? userIdFilter = userRole == "Admin" ? null : userId;

            income = await _repository.GetByIdAsync(request.Id, userIdFilter, request.BudgetId, cancellationToken);

            if (income == null)
            {

                throw new NotFoundException($"Income with ID {request.Id} not found in Budget {request.BudgetId}.");
            }

            return _mapper.Map<IncomeDTO>(income);
        }
    }
}
