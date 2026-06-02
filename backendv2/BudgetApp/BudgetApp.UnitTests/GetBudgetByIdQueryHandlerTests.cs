using AutoMapper;
using BudgetApp.Application.DTOs;
using BudgetApp.Application.Features.Budgets.Commands.DeleteBudget;
using BudgetApp.Application.Features.Budgets.Queries.GetBudgetById;
using BudgetApp.Application.Interfaces;
using BudgetApp.Domain.Expectations;
using BudgetApp.Domain.Interfaces;
using BudgetApp.Domain.Models;
using FluentAssertions;
using Moq;
using Xunit;

public class GetBudgetByIdQueryHandlerTests
{
    private readonly Mock<IBudgetRepository> _repositoryMock;
    private readonly Mock<ICurrentUserService> _userServiceMock;
    private readonly Mock<IMapper> _mapperMock;

    // To jest klasa, którą testujemy
    private readonly GetBudgetByIdQueryHandler _handler;

    public GetBudgetByIdQueryHandlerTests()
    {
        _repositoryMock = new Mock<IBudgetRepository>();
        _userServiceMock = new Mock<ICurrentUserService>();
        _mapperMock = new Mock<IMapper>();

        // Tworzymy instancję Handlera z naszymi mockami
        _handler = new GetBudgetByIdQueryHandler(
            _repositoryMock.Object,
            _mapperMock.Object,
            _userServiceMock.Object
        );
    }

    [Fact]
    public async Task Handle_WhenBudgetDoesNotExist_ShouldThrowNotFoundException()
    {
        // ARRANGE
        var budgetId = 999;

        // 1. Ustawiamy usera (żeby kod się nie wywalił na _currentUserService.UserId)
        _userServiceMock.Setup(x => x.UserId).Returns("user123");
        _userServiceMock.Setup(x => x.UserRole).Returns("User");

        // 2. Najważniejsze: Repozytorium ma zwrócić NULL dla tego ID
        _repositoryMock
            .Setup(x => x.GetByIdAsync(budgetId, It.IsAny<string>(), default))
            .ReturnsAsync((Budget)null);

        var query = new GetBudgetByIdQuery(budgetId); // lub { Id = budgetId } w zależności od konstrukcji

        // ACT
        // Tutaj wywołujemy metodę Handle bezpośrednio
        Func<Task> action = async () => await _handler.Handle(query, CancellationToken.None);

        // ASSERT
        // Sprawdzamy, czy metoda RZUCIŁA KONKRETNY WYJĄTEK
        await action.Should().ThrowAsync<NotFoundException>()
            .WithMessage($"Budget with id {budgetId} not found");
    }

    [Fact]
    public async Task Handle_WhenBudgetExists_ReturnsBudgetDTO()
    {
        // ARRANGE
        var budgetId = 1;
        var userId = "user123";

        // 1. Symulujemy usera
        _userServiceMock.Setup(x => x.UserId).Returns(userId);
        _userServiceMock.Setup(x => x.UserRole).Returns("User");

        // 2. Tworzymy obiekt (Encję), który rzekomo "siedzi" w bazie
        var budgetFromDb = new Budget
        {
            Id = budgetId,
            Title = "Wakacje",
            StartDate = DateTime.Now,
            EndDate = DateTime.Now,
            UserId = userId
        };

        // 3. Ustawiamy Repozytorium: "Jak zapytam o ID 1, zwróć ten obiekt"
        _repositoryMock
            .Setup(x => x.GetByIdAsync(budgetId, It.IsAny<string>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(budgetFromDb);

        // 4. Ustawiamy Mappera: "Jak dostaniesz Budget, zamień go na BudgetDTO"
        var expectedDto = new BudgetDTO { Id = budgetId, Title = "Wakacje" };

        _mapperMock
            .Setup(m => m.Map<BudgetDTO>(budgetFromDb))
            .Returns(expectedDto);

        var query = new GetBudgetByIdQuery(budgetId);

        // ACT
        // Tu wywołujemy normalnie (bez Func/Action), bo oczekujemy sukcesu!
        var result = await _handler.Handle(query, CancellationToken.None);

        // ASSERT
        // Sprawdzamy czy dostaliśmy wynik i czy dane się zgadzają
        result.Should().NotBeNull();            // Czy coś wróciło?
        result.Id.Should().Be(budgetId);        // Czy ID się zgadza?
        result.Title.Should().Be("Wakacje");    // Czy tytuł jest ok?
    }
}