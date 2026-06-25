using BudgetApp.Application.DTOs;
using BudgetApp.Application.Features.Budgets.Commands.CreateBudget;
using BudgetApp.Application.Features.Budgets.Commands.DeleteBudget;
using BudgetApp.Application.Features.Budgets.Queries.GetBudgetById;
using BudgetApp.Domain.Expectations;
using FluentAssertions;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using System.Net;
using System.Net.Http.Json;
using Xunit;

namespace BudgetApp.IntegrationTests
{
    public class BudgetsControllerTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _httpClient;
        private readonly Mock<IMediator> _mediatorMock = new Mock<IMediator>();

        public BudgetsControllerTests(WebApplicationFactory<Program> factory)
        {
            _httpClient = factory.WithWebHostBuilder(builder =>
            {
                builder.ConfigureServices(services =>
                {
                    // Podmieniamy Mediatora na naszego Mocka
                    var descriptor = services.SingleOrDefault(d => d.ServiceType == typeof(IMediator));
                    if (descriptor != null) services.Remove(descriptor);
                    services.AddScoped(_ => _mediatorMock.Object);

                    // Autoryzacja Testowa
                    services.AddAuthentication("Test")
                        .AddScheme<AuthenticationSchemeOptions, TestAuthHandler>("Test", null);
                });
            }).CreateClient();

            _httpClient.DefaultRequestHeaders.Authorization =
                new System.Net.Http.Headers.AuthenticationHeaderValue("Test");
        }

        [Fact]
        public async Task CreateBudget_WithValidData_ReturnsCreated()
        {
            // Arrange: Mockujemy, że Mediator pomyślnie stworzył budżet i zwrócił ID 1
            _mediatorMock
                .Setup(m => m.Send(It.IsAny<CreateBudgetCommand>(), default))
                .ReturnsAsync(1);

            var command = new CreateBudgetDTO("",0,DateTime.Today, DateTime.Today.AddDays(1));

            // Act
            var response = await _httpClient.PostAsJsonAsync("api/budgets", command);

            // Assert
            response.StatusCode.Should().Be(HttpStatusCode.Created);
        }

        [Fact]
        public async Task GetBudgetById_WhenExists_ReturnsOk()
        {
            // Arrange: Mockujemy, że budżet o ID 1 istnieje
            _mediatorMock
                .Setup(m => m.Send(It.IsAny<GetBudgetByIdQuery>(), default))
                .ReturnsAsync(new BudgetDTO { Id = 1, Title = "Wakacje" });

            // Act
            var response = await _httpClient.GetAsync("api/budgets/1");

            // Assert
            response.StatusCode.Should().Be(HttpStatusCode.OK);
        }

        // --- TESTY NEGATYWNE (ERROR HANDLING) ---

        [Fact]
        public async Task GetBudgetById_WhenNotExists_ReturnsNotFound()
        {
            // Arrange: Mockujemy, że Mediator nie znalazł budżetu (zwraca null)
            _mediatorMock
                .Setup(m => m.Send(It.IsAny<GetBudgetByIdQuery>(), default))
                .ThrowsAsync(new NotFoundException("Nie znaleziono budżetu"));

            // Act
            var response = await _httpClient.GetAsync("api/budgets/999");

            // Assert
            response.StatusCode.Should().Be(HttpStatusCode.NotFound);
        }

        [Fact]
        public async Task CreateBudget_WithInvalidData_ReturnsBadRequest()
        {
            // Tutaj symulujemy sytuację, w której walidacja zawiodła
            // Jeśli masz walidację w kontrolerze (np. FluentValidation), 
            // to serwer sam zwróci 400 przed wywołaniem Mediatora.

            var command = new CreateBudgetDTO("",0,DateTime.Today,DateTime.Today.AddDays(1)); // Pusty tytuł

            // Act
            var response = await _httpClient.PostAsJsonAsync("api/budgets", command);

            if (response.StatusCode == HttpStatusCode.InternalServerError)
            {
                var errorDetail = await response.Content.ReadAsStringAsync();
                throw new Exception($"Serwer wypluł 500. Treść błędu: {errorDetail}");
            }

            // Assert
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        }

        [Fact]
        public async Task DeleteBudget_WhenNotExists_ReturnsNotFound()
        {
            // Arrange: Symulujemy sytuację, w której Mediator rzuca wyjątek "Nie znaleziono"
            // (Wymaga to obsługi wyjątków w Middleware, aby zamienić to na 404)
            _mediatorMock
                .Setup(m => m.Send(It.IsAny<DeleteBudgetCommand>(), default))
                .ThrowsAsync(new NotFoundException("Budget not found"));

            // Act
            var response = await _httpClient.DeleteAsync("api/budgets/888");

            // Assert
            // Jeśli masz Middleware, zwróci 404. Jeśli nie, zwróci 500.
            // Na razie sprawdźmy, co masz teraz:
            response.StatusCode.Should().Be(HttpStatusCode.NotFound);
        }
    }
}
