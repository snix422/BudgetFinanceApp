using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BudgetApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddShareTokenAndFlagsToBudget : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Is80PercentAlertSend",
                table: "Budgets",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsSummaryEmailSent",
                table: "Budgets",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<Guid>(
                name: "ShareToken",
                table: "Budgets",
                type: "uniqueidentifier",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Is80PercentAlertSend",
                table: "Budgets");

            migrationBuilder.DropColumn(
                name: "IsSummaryEmailSent",
                table: "Budgets");

            migrationBuilder.DropColumn(
                name: "ShareToken",
                table: "Budgets");
        }
    }
}
