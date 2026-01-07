export type BudgetSplit = {
  needs: number;
  wants: number;
  savings: number;
};

const RATIOS = {
  needs: 0.5,
  wants: 0.3,
  savings: 0.2,
};

export const calculateBudgetSplit = (totalEarned: number | undefined | null): BudgetSplit => {
  const income = totalEarned ?? 0;

  return {
    needs: income * RATIOS.needs,
    wants: income * RATIOS.wants,
    savings: income * RATIOS.savings,
  };
};
