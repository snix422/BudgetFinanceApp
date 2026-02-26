using ScottPlot;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Common
{
    public static class ChartGenerator
    {
        public static byte[] GenerateExpensesPieChart(Dictionary<string, decimal> data)
        {
            Plot myPlot = new Plot();

            var pieSlices = data.Select(d => new PieSlice
            {
                Value = (double)d.Value,
                Label = d.Key,
                // Opcjonalnie możesz tu dodać własne kolory
            }).ToList();

            var pie = myPlot.Add.Pie(pieSlices);
            pie.DonutFraction = 0.5;
            //pie.ShowPercentages = true;
            pie.SliceLabelDistance = 1.2;

            myPlot.Axes.Frameless();
            myPlot.HideGrid();

            return myPlot.GetImageBytes(600, 400, ImageFormat.Png);
        }
    }
}
