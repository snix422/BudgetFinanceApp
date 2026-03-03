using AutoMapper;
using BudgetApp.Application.DTOs;
using BudgetApp.Application.Interfaces;
using BudgetApp.Domain.Interfaces;
using BudgetWebApi.Domain.Interfaces.MainInterface;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Features.Budgets.Queries.GetBudgetsByUser
{
    public class GetBudgetsByUserQueryHandler : IRequestHandler<GetBudgetsByUserQuery, IEnumerable<BudgetDTO>>
    {
        private readonly IBudgetRepository _repository;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;


        public GetBudgetsByUserQueryHandler(IBudgetRepository repository, ICurrentUserService currentUserService, IMapper mapper)
        {
            _repository = repository;
            _currentUserService = currentUserService;
            _mapper = mapper;
        }

        public async Task<IEnumerable<BudgetDTO>> Handle(GetBudgetsByUserQuery request, CancellationToken cancellationToken)
        {
            var userId = _currentUserService.UserId;

            var budgets = await _repository.GetAllByUserIdAsync(userId, cancellationToken);

            return _mapper.Map<IEnumerable<BudgetDTO>>(budgets);
        }
    }
}
