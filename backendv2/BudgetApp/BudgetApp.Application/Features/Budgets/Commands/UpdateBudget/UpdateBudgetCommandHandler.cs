using AutoMapper;
using BudgetApp.Application.Interfaces;
using BudgetApp.Domain.Expectations;
using BudgetApp.Domain.Interfaces;
using BudgetWebApi.Domain.Interfaces.MainInterface;
using BudgetWebApi.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Features.Budgets.Commands.UpdateBudget
{
    public class UpdateBudgetCommandHandler : IRequestHandler<UpdateBudgetCommand>
    {
        private readonly IBudgetRepository _repository;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;


        public UpdateBudgetCommandHandler(IBudgetRepository repository, IMapper mapper,ICurrentUserService currentUserService)
        {
            _repository = repository;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task Handle(UpdateBudgetCommand request, CancellationToken cancellationToken)
        {
            var userId = _currentUserService.UserId;
            var userRole = _currentUserService.UserRole;
            var userIdFilter = userRole == "Admin" ? null : userId;

            var existingBudget = await _repository.GetByIdAsync(request.Id,userIdFilter);

            if (existingBudget == null)
            {
                throw new NotFoundException("Budget not found");
            }

            var originalBudgetId = existingBudget.Id;

            _mapper.Map(request, existingBudget);
            existingBudget.Id = originalBudgetId;

            await _repository.Update(existingBudget,cancellationToken);
            
        }
    }
}
