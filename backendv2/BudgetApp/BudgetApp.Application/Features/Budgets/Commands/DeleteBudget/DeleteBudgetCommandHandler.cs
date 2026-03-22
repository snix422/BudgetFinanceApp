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

namespace BudgetApp.Application.Features.Budgets.Commands.DeleteBudget
{
    public class DeleteBudgetCommandHandler : IRequestHandler<DeleteBudgetCommand>
    {
        private readonly IBudgetRepository _repository;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public DeleteBudgetCommandHandler(IBudgetRepository repository, IMapper mapper, ICurrentUserService currentUserService)
        {
            _repository = repository;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task Handle(DeleteBudgetCommand request, CancellationToken cancellationToken)
        {
            var userId = _currentUserService.UserId;
            var userRole = _currentUserService.UserRole;
            var userIdFilter = userRole == "Admin" ? null : userId;

            var budget = await _repository.GetByIdAsync(request.Id, userIdFilter, cancellationToken);

            if (budget == null)
            {
                
                throw new NotFoundException("Budget not found or access denied.");
            }

            var rowsAffected = await _repository.Delete(request.Id,cancellationToken);
           
            
        }
    }
}
