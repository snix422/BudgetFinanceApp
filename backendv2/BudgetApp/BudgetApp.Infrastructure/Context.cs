using BudgetApp.Infrastructure.Identity;
using BudgetWebApi.Domain.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;

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
		modelBuilder.Entity<Budget>()
			.Property(b => b.TotalAmount)
			.HasColumnType("decimal(18,2)");

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
			.WithMany()
			.HasForeignKey(e => e.CategoryId)
			.OnDelete(DeleteBehavior.Restrict);

		modelBuilder.Entity<Income>()
			.HasOne(i => i.Category)
			.WithMany()
			.HasForeignKey(i => i.CategoryId)
			.OnDelete(DeleteBehavior.Restrict);




    }

}
