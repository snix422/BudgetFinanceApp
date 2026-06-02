using BudgetApp.Infrastructure.Identity;
using BudgetApp.Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BudgetApp.Infrastructure;

public class Context : IdentityDbContext<ApplicationUser>
{
	public DbSet<Income> Incomes { get; set; }
	public DbSet<Category> Categories { get; set; }
	public DbSet<Budget> Budgets { get; set; }
	public DbSet<Expense> Expenses { get; set; }

    public Context(DbContextOptions<Context> options) : base(options){}

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		base.OnModelCreating(modelBuilder);
        // Configure relationships and constraints here if needed

        modelBuilder.Entity<IdentityRole>().HasData(
        new IdentityRole
        {
            Id = "2c5e174e-3b0e-446f-86af-483d56fd7210",
            Name = "Admin",
            NormalizedName = "ADMIN"
        },
        new IdentityRole
        {
            Id = "2c5e174e-3b0e-446f-86af-483d56fd7211",
            Name = "User",
            NormalizedName = "USER"
        },
        new IdentityRole
        {
            Id = "2c5e174e-3b0e-446f-86af-483d56fd7212",
            Name = "Moderator",
            NormalizedName = "MODERATOR"
        }
    );


		modelBuilder.Entity<Income>()
			.Property(i => i.Amount)
			.HasColumnType("decimal(18,2)");

		modelBuilder.Entity<Expense>()
			.Property(e => e.Amount)
			.HasColumnType("decimal(18,2)");

		modelBuilder.Entity<Budget>()
			.HasMany(b => b.Incomes)
			.WithOne(i => i.Budget)
			.HasForeignKey(i => i.BudgetId)
			.OnDelete(DeleteBehavior.Cascade);

		modelBuilder.Entity<Budget>()
			.HasMany(b => b.Expenses)
			.WithOne(e => e.Budget)
			.HasForeignKey(e => e.BudgetId)
			.OnDelete(DeleteBehavior.Cascade);

		modelBuilder.Entity<Budget>()
			.HasOne<ApplicationUser>()
			.WithMany()
			.HasForeignKey(b => b.UserId)
			.OnDelete(DeleteBehavior.Cascade);

		modelBuilder.Entity<Category>()
			.HasIndex(c => c.Name)
			.IsUnique();

		modelBuilder.Entity<Expense>()
			.HasOne(e => e.Category)
			.WithMany(c => c.Expenses)
			.HasForeignKey(e => e.CategoryId)
			.OnDelete(DeleteBehavior.Restrict);

		

    }

}

