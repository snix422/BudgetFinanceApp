using Hangfire.Dashboard;

namespace BudgetApp.Api.Hangfire;

public class AllowAllDashboardAuthorizationFilter : IDashboardAuthorizationFilter
{
    public bool Authorize(DashboardContext context)
    {
        return true; 
    }
}