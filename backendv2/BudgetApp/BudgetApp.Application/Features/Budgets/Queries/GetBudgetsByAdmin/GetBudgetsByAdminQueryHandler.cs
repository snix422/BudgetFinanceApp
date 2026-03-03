using AutoMapper;
using BudgetApp.Application.DTOs;
using BudgetApp.Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Features.Budgets.Queries.GetBudgetsByAdmin
{
    public class GetBudgetsByAdminQueryHandler : IRequestHandler<GetBudgetsByAdminQuery, IEnumerable<BudgetDTO>>
    {
        private readonly IBudgetRepository _repository;
        private readonly IMapper _mapper;

        public GetBudgetsByAdminQueryHandler(IBudgetRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<BudgetDTO>> Handle(GetBudgetsByAdminQuery request, CancellationToken cancellationToken)
        {
            var budgets = await _repository.GetAllByUserIdAsync(request.TargetUserId,cancellationToken);
            return _mapper.Map<IEnumerable<BudgetDTO>>(budgets);
        }
    }
}
