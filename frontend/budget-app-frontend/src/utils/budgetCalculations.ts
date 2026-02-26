// src/utils/budgetCalculations.ts

import type { Category } from '@/schemas/categorySchema';
import type { Expense } from '@/schemas/expenseSchema';
import type { Income } from '@/schemas/incomeSchema';
import type { BudgetSplit } from '@/types/budget';
import { CategoryRule } from '@/types/enums';

const RATIOS = {
  needs: 0.5,
  wants: 0.3,
  savings: 0.2,
};
// 1. Łączenie i sortowanie transakcji
export const mergeAndSortTransactions = (
  incomes: Income[] | undefined,
  expenses: Expense[] | undefined,
) => {
  const incomeItems = (incomes || []).map((i) => ({ ...i, type: 'income' as const }));
  const expenseItems = (expenses || []).map((e) => ({ ...e, type: 'expense' as const }));

  return [...incomeItems, ...expenseItems].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
};

// 2. Grupowanie danych do wykresu
export const prepareChartData = (
  categories: Category[] | undefined,
  expenses: Expense[] | undefined,
) => {
  if (!categories || !expenses) return [];

  return categories
    .map((category) => {
      const matchingExpenses = expenses.filter((expense) => expense.categoryId === category.id);
      const totalAmount = matchingExpenses.reduce((sum, current) => sum + current.amount, 0);

      return {
        name: category.name,
        value: totalAmount,
      };
    })
    .filter((item) => item.value > 0); // Opcjonalnie: ukryj kategorie z zerowym wydatkiem
};

export const calculateBudgetSplit = (totalEarned: number | undefined | null): BudgetSplit => {
  const income = totalEarned ?? 0;

  return {
    needs: income * RATIOS.needs,
    wants: income * RATIOS.wants,
    savings: income * RATIOS.savings,
  };
};

export const calculateRuleSplit = (expenses: Expense[] | null | undefined) => {
  if (!expenses) return { totalAmountNeeds: 0, totalAmountWants: 0, totalAmountSavings: 0 };
  const matchingNeeds = expenses.filter((e) => e.categoryRule == CategoryRule.Needs);
  const matchingWants = expenses.filter((e) => e.categoryRule == CategoryRule.Wants);
  const matchingSavings = expenses.filter((e) => e.categoryRule == CategoryRule.Savings);
  const totalAmountNeeds = matchingNeeds.reduce((sum, current) => sum + current.amount, 0) || 0;
  const totalAmountWants = matchingWants.reduce((sum, current) => sum + current.amount, 0) || 0;
  const totalAmountSavings = matchingSavings.reduce((sum, current) => sum + current.amount, 0) || 0;
  return {
    totalAmountNeeds,
    totalAmountWants,
    totalAmountSavings,
  };
};

export const groupCategoriesByRule = (categories: Category[] | undefined) => {
  if (!categories) {
    return { needs: [], wants: [], savings: [] };
  }

  return {
    needs: categories.filter((c) => c.rule === CategoryRule.Needs),
    wants: categories.filter((c) => c.rule === CategoryRule.Wants),
    savings: categories.filter((c) => c.rule === CategoryRule.Savings),
  };
};
