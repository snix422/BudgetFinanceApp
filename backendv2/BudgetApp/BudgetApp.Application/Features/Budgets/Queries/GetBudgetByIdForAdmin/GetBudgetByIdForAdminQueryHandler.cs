using AutoMapper;
using BudgetApp.Application.DTOs;
using BudgetApp.Domain.Expectations;
using BudgetApp.Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Features.Budgets.Queries.GetBudgetByIdForAdmin
{
    public class GetBudgetByIdForAdminQueryHandler : IRequestHandler<GetBudgetByIdForAdminQuery, BudgetDTO>
    {
        private readonly IBudgetRepository _budgetRepository;
        private readonly IMapper _mapper;
        public GetBudgetByIdForAdminQueryHandler(IBudgetRepository budgetRepository, IMapper mapper)
        {
            _budgetRepository = budgetRepository;
            _mapper = mapper;
        }

        public async Task<BudgetDTO> Handle(GetBudgetByIdForAdminQuery request, CancellationToken cancellationToken)
        {
            var budget = await _budgetRepository.GetByIdAsync(request.BudgetId, request.UserId, cancellationToken);

            if (budget == null)
            {
                throw new NotFoundException($"Budget with ID {request.BudgetId} not found for user {request.UserId}.");
            }

            return _mapper.Map<BudgetDTO>(budget);
        }
    }
}
