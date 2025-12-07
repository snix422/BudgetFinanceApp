using BudgetWebApi.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;

public class Context : DbContext
{
	public DbSet<Income> Incomes { get; set; }
	public DbSet<User> Users { get; set; }
	public DbSet<Category> Categories { get; set; }
	public DbSet<Budget> Budgets { get; set; }
	public DbSet<Expense> Expenses { get; set; }

	public Context(DbContextOptions<Context> options) : base(options){}

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		base.OnModelCreating(modelBuilder);
        // Configure relationships and constraints here if needed
    }

}
