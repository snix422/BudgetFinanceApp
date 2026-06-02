using AutoMapper;
using BudgetApp.Application.Common;
using BudgetApp.Application.DTOs;
using BudgetApp.Application.Interfaces;
using BudgetApp.Domain.Expectations;
using BudgetApp.Domain.Interfaces;
using MediatR;

namespace BudgetApp.Application.Features.Budgets.Queries.ExportBudget
{
    public class ExportBudgetToPdfHandler : IRequestHandler<ExportBudgetToPdfQuery, FileExportResult>
    {
        private readonly IBudgetRepository _budgetRepository;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;
        private readonly IBudgetPdfReportGenerator _pdfReportGenerator;

        public ExportBudgetToPdfHandler(
            IBudgetRepository budgetRepository,
            ICurrentUserService currentUserService,
            IMapper mapper,
            IBudgetPdfReportGenerator pdfReportGenerator)
        {
            _budgetRepository = budgetRepository;
            _currentUserService = currentUserService;
            _mapper = mapper;
            _pdfReportGenerator = pdfReportGenerator;
        }

        public async Task<FileExportResult> Handle(ExportBudgetToPdfQuery request, CancellationToken cancellationToken)
        {
            var currentUserId = _currentUserService.UserId;
            var budget = await _budgetRepository.GetByIdAsync(int.Parse(request.BudgetId), currentUserId, cancellationToken);

            if (budget == null)
            {
                throw new NotFoundException("Budget not found");
            }

            var chartData = budget.Expenses
                .GroupBy(e => e.Category.Name)
                .ToDictionary(g => g.Key, g => g.Sum(e => e.Amount));

            var expensesDto = _mapper.Map<List<ExpenseDTO>>(budget.Expenses);

            var reportModel = new BudgetReportPdfModel(
                budget.Title,
                expensesDto,
                chartData);

            return await _pdfReportGenerator.GenerateAsync(reportModel, cancellationToken);
        }
    }
}
