using AutoMapper;
using BudgetApp.Application.Features.Budgets.Commands.DeleteBudget;
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
    public class DeleteBudgetCommandHandlerTests
    {
        private readonly Mock<IBudgetRepository> _repositoryMock;
        private readonly Mock<IMapper> _mapperMock; // Jest wstrzykiwany, więc musimy go zamockować (nawet jak nieużywany)
        private readonly Mock<ICurrentUserService> _userServiceMock;
        private readonly DeleteBudgetCommandHandler _handler;

        public DeleteBudgetCommandHandlerTests()
        {
            _repositoryMock = new Mock<IBudgetRepository>();
            _mapperMock = new Mock<IMapper>();
            _userServiceMock = new Mock<ICurrentUserService>();

            _handler = new DeleteBudgetCommandHandler(
                _repositoryMock.Object,
                _mapperMock.Object, // Przekazujemy mocka mappera
                _userServiceMock.Object
            );
        }

        // --- TEST 1: Zwykły użytkownik usuwa swój budżet (Happy Path) ---
        [Fact]
        public async Task Handle_WhenUserIsOwnerAndBudgetExists_ShouldCallDelete()
        {
            // ARRANGE
            var budgetId = 1;
            var userId = "user123";

            // 1. Symulujemy zwykłego użytkownika
            _userServiceMock.Setup(x => x.UserId).Returns(userId);
            _userServiceMock.Setup(x => x.UserRole).Returns("User");

            // 2. Repozytorium musi potwierdzić, że budżet istnieje dla tego usera
            var existingBudget = new Budget { Id = budgetId, UserId = userId, Title = "Test 123", StartDate = DateTime.Today, EndDate = DateTime.Today.AddDays(2) };

            _repositoryMock
                .Setup(x => x.GetByIdAsync(budgetId, userId, It.IsAny<CancellationToken>()))
                .ReturnsAsync(existingBudget);

            // 3. (Opcjonalnie) Mockujemy Delete, żeby zwróciło np. 1 (liczba usuniętych wierszy)
            _repositoryMock
                .Setup(x => x.Delete(budgetId, It.IsAny<CancellationToken>()))
                .ReturnsAsync(1);

            var command = new DeleteBudgetCommand(budgetId);

            // ACT
            await _handler.Handle(command, CancellationToken.None);

            // ASSERT
            // Sprawdzamy, czy metoda Delete została faktycznie wywołana dokładnie raz
            _repositoryMock.Verify(x => x.Delete(budgetId, It.IsAny<CancellationToken>()), Times.Once);
        }

        // --- TEST 2: Admin usuwa dowolny budżet (Happy Path - Admin logic) ---
        [Fact]
        public async Task Handle_WhenUserIsAdmin_ShouldCallDeleteIgnoringUserIdFilter()
        {
            // ARRANGE
            var budgetId = 2;
            var adminId = "admin999";

            // 1. Symulujemy Admina
            _userServiceMock.Setup(x => x.UserId).Returns(adminId);
            _userServiceMock.Setup(x => x.UserRole).Returns("Admin"); // <--- Kluczowe: Rola Admin

            // 2. Repozytorium musi zwrócić budżet, gdy filtr usera jest NULL (bo admin widzi wszystko)
            var budgetToDelete = new Budget { Id = budgetId, UserId = "someoneElse", Title ="Test 123" , StartDate = DateTime.Today, EndDate = DateTime.Today.AddDays(2)};

            _repositoryMock
                // Zauważ: Oczekujemy tu 'null' jako drugiego parametru (userIdFilter)
                .Setup(x => x.GetByIdAsync(budgetId, null, It.IsAny<CancellationToken>()))
                .ReturnsAsync(budgetToDelete);

            var command = new DeleteBudgetCommand(budgetId);

            // ACT
            await _handler.Handle(command, CancellationToken.None);

            // ASSERT
            // Verify sprawdza, czy kod przeszedł do usuwania
            _repositoryMock.Verify(x => x.Delete(budgetId, It.IsAny<CancellationToken>()), Times.Once);
        }

        // --- TEST 3: Budżet nie istnieje lub brak dostępu (Sad Path) ---
        [Fact]
        public async Task Handle_WhenBudgetDoesNotExistOrAccessDenied_ShouldThrowNotFoundException()
        {
            // ARRANGE
            var budgetId = 999;
            var userId = "user123";

            _userServiceMock.Setup(x => x.UserId).Returns(userId);
            _userServiceMock.Setup(x => x.UserRole).Returns("User");

            // 1. Repozytorium zwraca NULL (nie znaleziono lub budżet innego usera)
            _repositoryMock
                .Setup(x => x.GetByIdAsync(budgetId, userId, It.IsAny<CancellationToken>()))
                .ReturnsAsync((Budget)null);

            var command = new DeleteBudgetCommand(budgetId);

            // ACT
            Func<Task> action = async () => await _handler.Handle(command, CancellationToken.None);

            // ASSERT
            await action.Should().ThrowAsync<NotFoundException>()
                .WithMessage("Budget not found or access denied.");
        }
    }
}
