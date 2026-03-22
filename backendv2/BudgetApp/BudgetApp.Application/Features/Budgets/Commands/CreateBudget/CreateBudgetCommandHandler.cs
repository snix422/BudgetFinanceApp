using AutoMapper;
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

namespace BudgetApp.Application.Features.Budgets.Commands.CreateBudget
{
    public class CreateBudgetCommandHandler : IRequestHandler<CreateBudgetCommand, int>
    {
        private readonly IBudgetRepository _repository;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public CreateBudgetCommandHandler(IBudgetRepository repository, IMapper mapper, ICurrentUserService currentUserService)
        {
            _repository = repository;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task<int> Handle(CreateBudgetCommand request, CancellationToken cancellationToken)
        {

            var userId = _currentUserService.UserId;

           
            if (string.IsNullOrEmpty(userId))
            {
                throw new UnauthorizedAccessException("Brak zalogowanego użytkownika (lub błąd kontekstu).");
            }

            
            var budget = _mapper.Map<Budget>(request);

            
            budget.UserId = userId;

            
            await _repository.AddAsync(budget, cancellationToken);

            
            return budget.Id;
        }
    }
}
