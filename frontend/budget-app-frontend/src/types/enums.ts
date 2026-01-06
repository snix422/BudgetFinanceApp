export const CategoryRule = {
  Needs: 1,
  Wants: 2,
  Savings: 3,
} as const;

export type CategoryRuleType = (typeof CategoryRule)[keyof typeof CategoryRule];

export const CategoryRuleLabels: Record<number, string> = {
  1: 'Rachunki i Potrzeby (50%)',
  2: 'Przyjemności (30%)',
  3: 'Oszczędności (20%)',
};
