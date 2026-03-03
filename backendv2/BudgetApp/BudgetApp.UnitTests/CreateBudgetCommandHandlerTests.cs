using AutoMapper;
using BudgetApp.Application.Features.Budgets.Commands.CreateBudget;
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
    public class CreateBudgetCommandHandlerTests
    {
        private readonly Mock<IBudgetRepository> _repositoryMock;
        private readonly Mock<IMapper> _mapperMock;
        private readonly Mock<ICurrentUserService> _userServiceMock;
        private readonly CreateBudgetCommandHandler _handler;

        public CreateBudgetCommandHandlerTests()
        {
            _repositoryMock = new Mock<IBudgetRepository>();
            _mapperMock = new Mock<IMapper>();
            _userServiceMock = new Mock<ICurrentUserService>();

            _handler = new CreateBudgetCommandHandler(
                _repositoryMock.Object,
                _mapperMock.Object,
                _userServiceMock.Object
            );
        }

        // --- TEST 1: Sukces - przypisanie usera i zapis ---
        [Fact]
        public async Task Handle_WhenUserIsLoggedIn_ShouldAssignUserIdAndReturnNewId()
        {
            // ARRANGE
            var userId = "user123";
            var newBudgetId = 55; // Symulujemy, że baza nadała takie ID

            // 1. Symulujemy zalogowanego użytkownika
            _userServiceMock.Setup(x => x.UserId).Returns(userId);

            // 2. Przygotowujemy komendę (zakładam, że masz settery, jeśli nie - użyj konstruktora)
            var command = new CreateBudgetCommand
            {
                Title = "Nowy Budżet",
                TotalAmount = 1000
            };

            // 3. Przygotowujemy encję, którą zwróci Mapper
            // WAŻNE: Ustawiamy jej ID od razu, żeby sprawdzić, czy Handler je zwróci
            var budgetEntity = new Budget
            {
                Id = newBudgetId,
                Title = "Nowy Budżet",
                StartDate = DateTime.Today,
                EndDate = DateTime.Today.AddDays(1),
                UserId = "2"
                // UserId na razie jest puste (handler ma je ustawić!)
            };

            _mapperMock
                .Setup(m => m.Map<Budget>(command))
                .Returns(budgetEntity);

            // 4. Mockujemy Repozytorium (AddAsync zazwyczaj nic nie zwraca, albo Task)
            _repositoryMock
                .Setup(r => r.AddAsync(budgetEntity, It.IsAny<CancellationToken>()))
                .Returns(Task.CompletedTask);

            // ACT
            var result = await _handler.Handle(command, CancellationToken.None);

            // ASSERT

            // A. Sprawdzamy czy Handler zwrócił ID, które "nadaliśmy" encji
            result.Should().Be(newBudgetId);

            // B. NAJWAŻNIEJSZE: Czy Handler wpisał UserId do encji przed zapisem?
            budgetEntity.UserId.Should().Be(userId);

            // C. Czy metoda AddAsync została wywołana dokładnie raz z tą encją?
            _repositoryMock.Verify(r => r.AddAsync(budgetEntity, It.IsAny<CancellationToken>()), Times.Once);
        }

        // --- TEST 2: Błąd bezpieczeństwa - brak usera ---
        [Fact]
        public async Task Handle_WhenUserIsNotLoggedIn_ShouldThrowUnauthorized()
        {
            // ARRANGE
            // Symulujemy brak usera (null lub pusty string)
            _userServiceMock.Setup(x => x.UserId).Returns((string)null);

            var command = new CreateBudgetCommand { Title = "Hacker Attempt" };

            // ACT
            // Używamy Func, bo spodziewamy się wyjątku
            Func<Task> action = async () => await _handler.Handle(command, CancellationToken.None);

            // ASSERT
            await action.Should().ThrowAsync<UnauthorizedAccessException>()
                .WithMessage("Brak zalogowanego użytkownika (lub błąd kontekstu).");

            // Upewniamy się, że nic nie trafiło do bazy
            _repositoryMock.Verify(r => r.AddAsync(It.IsAny<Budget>(), It.IsAny<CancellationToken>()), Times.Never);
        }
    }
}
