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
using Microsoft.AspNetCore.Authorization;

var builder = WebApplication.CreateBuilder(args);

var jwtKeyFile = builder.Configuration["Jwt:KeyFile"] ?? "/run/secrets/jwt_key"; 
if (File.Exists(jwtKeyFile))
{
    builder.Configuration["Jwt:Key"] = File.ReadAllText(jwtKeyFile).Trim();
}
var jwtKey = builder.Configuration["Jwt:Key"];
if(string.IsNullOrWhiteSpace(jwtKey))
{
    throw new Exception("JWT key is not set. Please provide a valid key in the configuration or in the secrets file.");
}
if (System.Text.Encoding.UTF8.GetByteCount(jwtKey) < 32)
{
    throw new Exception("JWT key is too short. It must be at least 32 characters long for security reasons.");
}
builder.Host.UseSerilog((context, configuration) =>
    configuration.ReadFrom.Configuration(context.Configuration));

QuestPDF.Settings.License = LicenseType.Community;
builder.Services.AddHttpContextAccessor();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173", "http://localhost:3000") 
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials(); 
        });
});


builder.Services.AddRouting(options => {
    options.LowercaseUrls = true; 
});

builder.Services.AddHangfire(configuration => configuration
    .SetDataCompatibilityLevel(CompatibilityLevel.Version_180)
    .UseSimpleAssemblyNameTypeSerializer()
    .UseRecommendedSerializerSettings()
   
    .UseSqlServerStorage(builder.Configuration.GetConnectionString("DefaultConnection")));


EnsureDatabaseExists(builder.Configuration.GetConnectionString("DefaultConnection"));
builder.Services.AddHangfireServer();
builder.Services.AddControllers();


builder.Services.AddAuthorization(options =>
{
    options.FallbackPolicy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build();
});


builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);

var app = builder.Build();


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
        InitialCatalog = "master" 
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


