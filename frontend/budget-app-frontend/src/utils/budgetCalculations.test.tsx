import { describe, it, expect } from 'vitest';
import {
  mergeAndSortTransactions,
  prepareChartData,
  calculateBudgetSplit,
  calculateRuleSplit,
  groupCategoriesByRule,
} from './budgetCalculations';
import { CategoryRule } from '@/types/enums';

describe('budgetCalculations', () => {
  // --- TEST 1: Łączenie i Sortowanie ---
  describe('mergeAndSortTransactions', () => {
    it('should merge incomes and expenses and sort them by date descending', () => {
      const incomes: any[] = [{ id: 1, amount: 100, date: '2024-01-01' }];
      const expenses: any[] = [{ id: 2, amount: 50, date: '2024-01-05' }]; // Nowsza data

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
      const categories: any[] = [
        { id: 1, name: 'Jedzenie' },
        { id: 2, name: 'Auto' },
      ];
      const expenses: any[] = [
        { id: 10, amount: 50, categoryId: 1 },
        { id: 11, amount: 20, categoryId: 1 }, // Razem 70 w Jedzenie
        { id: 12, amount: 100, categoryId: 2 }, // 100 w Auto
      ];

      const result = prepareChartData(categories, expenses);

      expect(result).toEqual([
        { name: 'Jedzenie', value: 70 },
        { name: 'Auto', value: 100 },
      ]);
    });

    it('should filter out categories with zero value', () => {
      const categories: any[] = [{ id: 1, name: 'Puste' }];
      const expenses: any[] = []; // Brak wydatków

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
      const expenses: any[] = [
        { amount: 100, categoryRule: CategoryRule.Needs },
        { amount: 50, categoryRule: CategoryRule.Needs },
        { amount: 30, categoryRule: CategoryRule.Wants },
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
      const categories: any[] = [
        { id: 1, rule: CategoryRule.Needs },
        { id: 2, rule: CategoryRule.Wants },
        { id: 3, rule: CategoryRule.Savings },
        { id: 4, rule: CategoryRule.Needs },
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
