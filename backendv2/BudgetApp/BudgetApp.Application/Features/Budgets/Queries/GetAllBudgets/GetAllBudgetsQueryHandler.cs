using AutoMapper;
using BudgetApp.Application.DTOs;
using BudgetApp.Application.Interfaces;
using BudgetApp.Domain.Interfaces;
using BudgetApp.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Features.Budgets.Queries.GetAllBudgets
{
    public class GetAllBudgetsQueryHandler : IRequestHandler<GetAllBudgetsQuery, IEnumerable<BudgetDTO>>
    {
        private readonly IBudgetRepository _repository;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public GetAllBudgetsQueryHandler(IBudgetRepository repository, IMapper mapper, ICurrentUserService currentUserService)
        {
            _repository = repository;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task<IEnumerable<BudgetDTO>> Handle(GetAllBudgetsQuery request, CancellationToken cancellationToken)
        {
            var budgets = await _repository.GetAllAsync(cancellationToken);
            return _mapper.Map<IEnumerable<BudgetDTO>>(budgets);
        }
    }
}
