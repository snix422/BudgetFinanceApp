using ScottPlot;

namespace BudgetApp.Infrastructure.Reporting;

internal static class ChartGenerator
{
    public static byte[] GenerateExpensesPieChart(IReadOnlyDictionary<string, decimal> data)
    {
        Plot myPlot = new();

        var pieSlices = data.Select(d => new PieSlice
        {
            Value = (double)d.Value,
            Label = d.Key,
        }).ToList();

        var pie = myPlot.Add.Pie(pieSlices);
        pie.DonutFraction = 0.5;
        pie.SliceLabelDistance = 1.2;

        myPlot.Axes.Frameless();
        myPlot.HideGrid();

        return myPlot.GetImageBytes(600, 400, ImageFormat.Png);
    }
}
