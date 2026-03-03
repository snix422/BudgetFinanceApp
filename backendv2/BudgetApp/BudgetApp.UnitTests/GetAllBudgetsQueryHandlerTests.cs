using AutoMapper;
using BudgetApp.Application.DTOs;
using BudgetApp.Application.Features.Budgets.Queries.GetAllBudgets;
using BudgetApp.Application.Interfaces;
using BudgetApp.Domain.Interfaces;
using BudgetWebApi.Domain.Models;
using FluentAssertions;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace BudgetApp.UnitTests
{
    public class GetAllBudgetsQueryHandlerTests
    {
        private readonly Mock<IBudgetRepository> _repositoryMock;
        private readonly Mock<IMapper> _mapperMock;
        private readonly Mock<ICurrentUserService> _userServiceMock;
        private readonly GetAllBudgetsQueryHandler _handler;

        public GetAllBudgetsQueryHandlerTests()
        {
            _repositoryMock = new Mock<IBudgetRepository>();
            _mapperMock = new Mock<IMapper>();
            _userServiceMock = new Mock<ICurrentUserService>();

            _handler = new GetAllBudgetsQueryHandler(
                _repositoryMock.Object,
                _mapperMock.Object,
                _userServiceMock.Object
            );
        }

        [Fact]
        public async Task Handle_WhenBudgetsExist_ReturnsListOfBudgetDTOs()
        {
            // ARRANGE
            // 1. Przygotowujemy "bazę danych" z dwoma budżetami
            var budgetsList = new List<Budget>
        {
            new Budget { Id = 1, Title = "Domowy" , StartDate = DateTime.Today, EndDate = DateTime.Today.AddDays(2), UserId = "2" },
            new Budget { Id = 2, Title = "Firmowy", StartDate = DateTime.Today, EndDate = DateTime.Today.AddDays(2), UserId = "3"}
        };

            // 2. Przygotowujemy wynik, jaki ma zwrócić Mapper
            var expectedDtos = new List<BudgetDTO>
        {
            new BudgetDTO { Id = 1, Title = "Domowy" },
            new BudgetDTO { Id = 2, Title = "Firmowy" }
        };

            // 3. Konfigurujemy Repozytorium
            _repositoryMock
                .Setup(r => r.GetAllAsync(It.IsAny<CancellationToken>()))
                .ReturnsAsync(budgetsList);

            // 4. Konfigurujemy Mappera (bo handler go używa na końcu)
            _mapperMock
                .Setup(m => m.Map<IEnumerable<BudgetDTO>>(budgetsList))
                .Returns(expectedDtos);

            var query = new GetAllBudgetsQuery();

            // ACT
            var result = await _handler.Handle(query, CancellationToken.None);

            // ASSERT
            result.Should().NotBeNull();            // Nie może być nullem
            result.Should().HaveCount(2);           // Musi mieć 2 elementy
            result.Should().BeEquivalentTo(expectedDtos); // Musi zawierać to samo co DTO
        }

        [Fact]
        public async Task Handle_WhenRepositoryReturnsEmpty_ReturnsEmptyList()
        {
            // ARRANGE
            var emptyList = new List<Budget>();
            var emptyDtos = new List<BudgetDTO>();

            // Symulujemy pustą bazę
            _repositoryMock
                .Setup(r => r.GetAllAsync(It.IsAny<CancellationToken>()))
                .ReturnsAsync(emptyList);

            // Mapper też musi wiedzieć, co zrobić z pustą listą
            _mapperMock
                .Setup(m => m.Map<IEnumerable<BudgetDTO>>(emptyList))
                .Returns(emptyDtos);

            // ACT
            var result = await _handler.Handle(new GetAllBudgetsQuery(), CancellationToken.None);

            // ASSERT
            result.Should().NotBeNull(); // Ważne! Nie chcemy nulla, chcemy pustą listę []
            result.Should().BeEmpty();
        }
    }
}
