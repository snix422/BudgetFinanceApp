using BudgetApp.Api.Middlewares;
using BudgetApp.Application;
using BudgetApp.Infrastructure;
using BudgetApp.Infrastructure.BackgroundJobs;
using BudgetApp.Infrastructure.Identity;
using FluentValidation.AspNetCore;
using Hangfire;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using QuestPDF.Infrastructure;
using Serilog;
using System.Text;
using Microsoft.Data.SqlClient;

var builder = WebApplication.CreateBuilder(args);
builder.Host.UseSerilog((context, configuration) =>
    configuration.ReadFrom.Configuration(context.Configuration));
// Add services to the container.
QuestPDF.Settings.License = LicenseType.Community;
builder.Services.AddHttpContextAccessor();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173", "http://localhost:3000") // <-- Tutaj wpisz adres Frontendu (bez / na ko�cu)
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials(); // Wa�ne, je�li u�ywasz ciasteczek (HttpOnly cookies)
        });
});

// ... inne serwisy ...
builder.Services.AddRouting(options => {
    options.LowercaseUrls = true; // <--- To magiczna linijka
});

builder.Services.AddHangfire(configuration => configuration
    .SetDataCompatibilityLevel(CompatibilityLevel.Version_180)
    .UseSimpleAssemblyNameTypeSerializer()
    .UseRecommendedSerializerSettings()
    // Tutaj podaj connection string do swojej bazy danych
    .UseSqlServerStorage(builder.Configuration.GetConnectionString("DefaultConnection")));

// Dodaj serwer, kt�ry faktycznie b�dzie te zadania wykonywa�
EnsureDatabaseExists(builder.Configuration.GetConnectionString("DefaultConnection"));
builder.Services.AddHangfireServer();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseMiddleware<ErrorHandlingMiddleware>();
app.UseSerilogRequestLogging();
app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();

app.UseHangfireDashboard();


app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<Context>();
    for (int attempts = 0; attempts < 5; attempts++)
    {
        try
        {
            db.Database.Migrate();
            break;
        }
        catch when (attempts < 5) 
        {
            Thread.Sleep(TimeSpan.FromSeconds(5)); 
            throw;
        }
    }
}

    app.Run();

static void EnsureDatabaseExists(string connectionString){
    var database = new SqlConnectionStringBuilder(connectionString).InitialCatalog;
    var masterConnectionString = new SqlConnectionStringBuilder(connectionString)
    {
        InitialCatalog = "master" // Połącz się z bazą master, aby móc tworzyć inne bazy
    }.ConnectionString;

    for(int attempt=1; ; attempt++){
        try{
            using var connection = new SqlConnection(masterConnectionString);
            connection.Open();
            using var command = connection.CreateCommand();
            command.CommandText = $"IF DB_ID(@name) IS NULL CREATE DATABASE [{database}];";
            command.Parameters.AddWithValue("@name", database);
            command.ExecuteNonQuery();
            return;
            
        }catch(SqlException ex)when(attempt<10){
            Thread.Sleep(TimeSpan.FromSeconds(3));
        }

    }

}

public partial class Program { }


