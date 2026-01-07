import { CategoryRule } from '@/types/enums';

export const calculateRuleSplit = (expenses: any[] | null | undefined) => {
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
