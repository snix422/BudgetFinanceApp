using Hangfire.Annotations;
using Hangfire.Dashboard;

namespace BudgetApp.Api.Hangfire;

public class AdminDashboardAuthorizationFilter : IDashboardAuthorizationFilter
{
    public bool Authorize([NotNull] DashboardContext context)
    {
        var user = context.GetHttpContext().User;
        return user.Identity?.IsAuthenticated == true && user.IsInRole("Admin");
    }
}
