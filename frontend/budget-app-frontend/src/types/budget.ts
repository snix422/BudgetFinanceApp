import type { SharedTransaction } from './transaction';

export type BudgetSplit = {
  needs: number;
  wants: number;
  savings: number;
};

export type BudgetRuleResults = {
  totalAmountNeeds: number;
  totalAmountWants: number;
  totalAmountSavings: number;
};

export type SharedBudget = {
  name: string;
  totalIncomes: number;
  totalExpenses: number;
  transactions: SharedTransaction[];
};
