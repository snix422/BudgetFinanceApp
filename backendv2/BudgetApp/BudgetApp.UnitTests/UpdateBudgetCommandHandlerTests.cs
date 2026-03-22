using AutoMapper;
using BudgetApp.Application.Features.Budgets.Commands.UpdateBudget;
using BudgetApp.Application.Interfaces;
using BudgetApp.Domain.Expectations;
using BudgetApp.Domain.Interfaces;
using BudgetApp.Domain.Models;
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
    public class UpdateBudgetCommandHandlerTests
    {
        private readonly Mock<IBudgetRepository> _repositoryMock;
        private readonly Mock<IMapper> _mapperMock;
        private readonly Mock<ICurrentUserService> _userServiceMock;
        private readonly UpdateBudgetCommandHandler _handler;

        public UpdateBudgetCommandHandlerTests()
        {
            _repositoryMock = new Mock<IBudgetRepository>();
            _mapperMock = new Mock<IMapper>();
            _userServiceMock = new Mock<ICurrentUserService>();

            _handler = new UpdateBudgetCommandHandler(
                _repositoryMock.Object,
                _mapperMock.Object,
                _userServiceMock.Object
            );
        }

        // --- TEST 1: Właściciel aktualizuje swój budżet (Happy Path) ---
        [Fact]
        public async Task Handle_WhenUserIsOwner_ShouldUpdateBudget()
        {
            // ARRANGE
            var budgetId = 1;
            var userId = "user123";

            // 1. Symulujemy usera
            _userServiceMock.Setup(x => x.UserId).Returns(userId);
            _userServiceMock.Setup(x => x.UserRole).Returns("User");

            // 2. Repozytorium zwraca istniejący budżet
            var existingBudget = new Budget { Id = budgetId, Title = "Stary Tytuł", UserId = userId, StartDate = DateTime.Now, EndDate =DateTime.Now.AddDays(2) };

            _repositoryMock
                .Setup(x => x.GetByIdAsync(budgetId, userId, It.IsAny<CancellationToken>())) // User ID przekazany jako filtr
                .ReturnsAsync(existingBudget);

            // 3. Command z nowymi danymi
            var command = new UpdateBudgetCommand { Id = budgetId, Title = "Nowy Tytuł" }; // Dostosuj do swojego konstruktora

            // ACT
            await _handler.Handle(command, CancellationToken.None);

            // ASSERT
            // Sprawdzamy czy Mapper został poproszony o przepisanie danych z command do existingBudget
            _mapperMock.Verify(m => m.Map(command, existingBudget), Times.Once);

            // Sprawdzamy czy Repozytorium zapisało zmiany
            _repositoryMock.Verify(r => r.Update(existingBudget, It.IsAny<CancellationToken>()), Times.Once);
        }

        // --- TEST 2: Admin aktualizuje cudzy budżet ---
        [Fact]
        public async Task Handle_WhenUserIsAdmin_ShouldUpdateBudgetIgnoringUserId()
        {
            // ARRANGE
            var budgetId = 2;
            var adminId = "admin999";
            var otherUserId = "userXYZ";

            // 1. Symulujemy Admina
            _userServiceMock.Setup(x => x.UserId).Returns(adminId);
            _userServiceMock.Setup(x => x.UserRole).Returns("Admin");

            // 2. Repozytorium zwraca cudzy budżet (zwróć uwagę na null w filtrze!)
            var existingBudget = new Budget { Id = budgetId,Title = "Tytuł 1", UserId = otherUserId, StartDate = DateTime.Now, EndDate = DateTime.Now.AddDays(2)};

            _repositoryMock
                .Setup(x => x.GetByIdAsync(budgetId, null, It.IsAny<CancellationToken>())) // Admin ma null jako filtr
                .ReturnsAsync(existingBudget);

            var command = new UpdateBudgetCommand { Id = budgetId, Title = "Admin Edit" };

            // ACT
            await _handler.Handle(command, CancellationToken.None);

            // ASSERT
            _repositoryMock.Verify(r => r.Update(existingBudget, It.IsAny<CancellationToken>()), Times.Once);
        }

        // --- TEST 3: Nie znaleziono budżetu (Sad Path) ---
        [Fact]
        public async Task Handle_WhenBudgetNotFound_ShouldThrowException()
        {
            // ARRANGE
            var budgetId = 999;
            var userId = "user123";

            _userServiceMock.Setup(x => x.UserId).Returns(userId);
            _userServiceMock.Setup(x => x.UserRole).Returns("User");

            // Repozytorium zwraca NULL
            _repositoryMock
                .Setup(x => x.GetByIdAsync(budgetId, userId, It.IsAny<CancellationToken>()))
                .ReturnsAsync((Budget)null);

            var command = new UpdateBudgetCommand { Id = budgetId };

            // ACT
            Func<Task> action = async () => await _handler.Handle(command, CancellationToken.None);

            // ASSERT
            // W twoim kodzie rzucasz ogólny Exception("Budget not found"), więc to sprawdzamy
            await action.Should().ThrowAsync<NotFoundException>()
                .WithMessage("Budget not found");
        }
    }
}
