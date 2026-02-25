import { describe, it, expect } from 'vitest';
import {
  mergeAndSortTransactions,
  prepareChartData,
  calculateBudgetSplit,
  calculateRuleSplit,
  groupCategoriesByRule,
} from './budgetCalculations';
import { CategoryRule } from '@/types/enums';
import type { Income } from '@/schemas/incomeSchema';
import type { Expense } from '@/schemas/expenseSchema';
import type { Category } from '@/schemas/categorySchema';

describe('budgetCalculations', () => {
  // --- TEST 1: Łączenie i Sortowanie ---
  describe('mergeAndSortTransactions', () => {
    it('should merge incomes and expenses and sort them by date descending', () => {
      const incomes: Income[] = [
        { id: 1, title: 'Wynagrodzenie', amount: 100, date: '2024-01-01' },
      ];
      const expenses: Expense[] = [
        {
          id: 2,
          title: 'Kino',
          amount: 50,
          date: '2024-01-05',
          categoryId: 1,
          categoryName: 'Rozrywka',
          categoryRule: CategoryRule.Wants,
        },
      ]; // Nowsza data

      const result = mergeAndSortTransactions(incomes, expenses);

      expect(result).toHaveLength(2);
      expect(result[0].type).toBe('expense'); // Nowsza data powinna być pierwsza
      expect(result[1].type).toBe('income');
    });

    it('should handle undefined inputs gracefully', () => {
      const result = mergeAndSortTransactions(undefined, undefined);
      expect(result).toEqual([]);
    });
  });

  // --- TEST 2: Dane do wykresu ---
  describe('prepareChartData', () => {
    it('should group expenses by category and sum amounts', () => {
      const categories: Category[] = [
        { id: 1, name: 'Jedzenie', rule: CategoryRule.Needs },
        { id: 2, name: 'Auto', rule: CategoryRule.Wants },
      ];
      const expenses: Expense[] = [
        {
          id: 10,
          title: 'Kupno jedzenia',
          amount: 50,
          categoryId: 1,
          date: '2024-01-01',
          categoryName: 'Jedzenie',
          categoryRule: CategoryRule.Needs,
        }, // 50 w Jedzenie
        {
          id: 11,
          title: 'Kupno jedzenia',
          amount: 20,
          categoryId: 1,
          date: '2024-01-02',
          categoryName: 'Jedzenie',
          categoryRule: CategoryRule.Needs,
        }, // Razem 70 w Jedzenie
        {
          id: 12,
          title: 'Kupno auta',
          amount: 100,
          categoryId: 2,
          date: '2024-01-03',
          categoryName: 'Auto',
          categoryRule: CategoryRule.Wants,
        }, // 100 w Auto
      ];

      const result = prepareChartData(categories, expenses);

      expect(result).toEqual([
        { name: 'Jedzenie', value: 70 },
        { name: 'Auto', value: 100 },
      ]);
    });

    it('should filter out categories with zero value', () => {
      const categories: Category[] = [{ id: 1, name: 'Puste', rule: CategoryRule.Needs }];
      const expenses: Expense[] = []; // Brak wydatków

      const result = prepareChartData(categories, expenses);

      expect(result).toHaveLength(0); // Pusta kategoria powinna zniknąć
    });
  });

  // --- TEST 3: Reguła 50/30/20 (Limity) ---
  describe('calculateBudgetSplit', () => {
    it('should calculate correct 50/30/20 split for given income', () => {
      const income = 1000;
      const { needs, wants, savings } = calculateBudgetSplit(income);

      expect(needs).toBe(500); // 50%
      expect(wants).toBe(300); // 30%
      expect(savings).toBe(200); // 20%
    });

    it('should return zeros for null income', () => {
      const result = calculateBudgetSplit(null);
      expect(result).toEqual({ needs: 0, wants: 0, savings: 0 });
    });
  });

  // --- TEST 4: Reguła 50/30/20 (Wydatki) ---
  describe('calculateRuleSplit', () => {
    it('should sum expenses based on category rules', () => {
      const expenses: Expense[] = [
        {
          id: 1,
          title: 'Koszt podstawowy',
          amount: 100,
          categoryId: 1,
          date: '2024-01-01',
          categoryName: 'Koszty podstawowe',
          categoryRule: CategoryRule.Needs,
        },
        {
          id: 2,
          title: 'Koszt podstawowy',
          amount: 50,
          categoryId: 1,
          date: '2024-01-02',
          categoryName: 'Koszty podstawowe',
          categoryRule: CategoryRule.Needs,
        },
        {
          id: 3,
          title: 'Rozrywka',
          amount: 30,
          categoryId: 2,
          date: '2024-01-03',
          categoryName: 'Rozrywka',
          categoryRule: CategoryRule.Wants,
        },
        // Brak savings
      ];

      const result = calculateRuleSplit(expenses);

      expect(result.totalAmountNeeds).toBe(150);
      expect(result.totalAmountWants).toBe(30);
      expect(result.totalAmountSavings).toBe(0);
    });
  });

  // --- TEST 5: Grupowanie Kategorii ---
  describe('groupCategoriesByRule', () => {
    it('should separate categories into buckets', () => {
      const categories: Category[] = [
        { id: 1, name: 'Koszty podstawowe', rule: CategoryRule.Needs },
        { id: 2, name: 'Rozrywka', rule: CategoryRule.Wants },
        { id: 3, name: 'Oszczędzanie', rule: CategoryRule.Savings },
        { id: 4, name: 'Koszty podstawowe 2', rule: CategoryRule.Needs },
      ];

      const result = groupCategoriesByRule(categories);

      expect(result.needs).toHaveLength(2);
      expect(result.wants).toHaveLength(1);
      expect(result.savings).toHaveLength(1);
    });

    it('should return empty arrays if input is undefined', () => {
      const result = groupCategoriesByRule(undefined);
      expect(result.needs).toEqual([]);
      expect(result.wants).toEqual([]);
      expect(result.savings).toEqual([]);
    });
  });
});
