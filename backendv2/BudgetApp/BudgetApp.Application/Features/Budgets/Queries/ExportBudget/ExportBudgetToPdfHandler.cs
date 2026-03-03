using AutoMapper;
using BudgetApp.Application.Common;
using BudgetApp.Application.DTOs;
using BudgetApp.Application.Interfaces;
using BudgetApp.Application.Services;
using BudgetApp.Domain.Expectations;
using BudgetApp.Domain.Interfaces;
using MediatR;
using QuestPDF.Fluent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Features.Budgets.Queries.ExportBudget
{
    public class ExportBudgetToPdfHandler : IRequestHandler<ExportBudgetToPdfQuery, FileExportResult>
    {
        private readonly IBudgetRepository _budgetRepository;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;

        public ExportBudgetToPdfHandler(IBudgetRepository budgetRepository, ICurrentUserService currentUserService, IMapper mapper)
        {
            _budgetRepository = budgetRepository;
            _currentUserService = currentUserService;
            _mapper = mapper;
        }

        public async Task<FileExportResult> Handle(ExportBudgetToPdfQuery request, CancellationToken cancellationToken)
        {
            var currentUserId = _currentUserService.UserId;
            var budget = await _budgetRepository.GetByIdAsync(int.Parse(request.BudgetId), currentUserId, cancellationToken);
           

            if (budget == null)
            {
                throw new NotFoundException("Budget not found");
            }
            // Here you would implement the logic to generate a PDF from the budget data.
            // For demonstration purposes, we'll return a dummy PDF file.

            var chartData = budget.Expenses
                .GroupBy(e => e.Category.Name)
                .ToDictionary(g => g.Key, g => g.Sum(e => e.Amount));

            byte[] chartImageBytes = ChartGenerator.GenerateExpensesPieChart(chartData);
            /*var expensesDTO = budget.Expenses.Select(e => new
            {
                e.Title,
                e.Amount,
                Category = e.Category.Name,
                e.Date
            }).ToList();*/

            var expensesDTO = _mapper.Map<List<ExpenseDTO>>(budget.Expenses);

            var reportModel = new BudgetReportModel(budget.Title, expensesDTO, chartImageBytes);
            var document = new BudgetReportDocument(reportModel);

            byte[] pdfBytes = document.GeneratePdf();

            return new FileExportResult
            (
                Content: pdfBytes,
                ContentType: "application/pdf",
                FileName: $"raport_{budget.Title}_{DateTime.UtcNow:yyyyMMdd}.pdf"
            );
        }
    }
}
