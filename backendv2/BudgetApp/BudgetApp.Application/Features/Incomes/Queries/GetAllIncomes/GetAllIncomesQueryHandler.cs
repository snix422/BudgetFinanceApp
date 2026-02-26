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

namespace BudgetApp.Application.Features.Incomes.Queries.GetAllIncomes
{
    public class GetAllIncomesQueryHandler : IRequestHandler<GetAllIncomesQuery, IEnumerable<IncomeDTO>>
    {
        private readonly IIncomeRepository _repository;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public GetAllIncomesQueryHandler(IIncomeRepository repository, IMapper mapper, ICurrentUserService currentUserService)
        {
            _repository = repository;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task<IEnumerable<IncomeDTO>> Handle(GetAllIncomesQuery request, CancellationToken cancellationToken)
        {
            var userId = _currentUserService.UserId;
            var userRole = _currentUserService.UserRole;
            var userIdFilter = userRole == "Admin" ? null : userId;

            var incomes = await _repository.GetAllAsync(userIdFilter,request.BudgetId,cancellationToken);

            return _mapper.Map<IEnumerable<IncomeDTO>>(incomes);
        }
    }
}
