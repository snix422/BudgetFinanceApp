export interface Budget {
  id: number;
  name: string;
  amount: number;
  currency: string;
  // inne pola...
}

// To odzwierciedla to, co wysyłamy przy tworzeniu (bez ID, bo ID nadaje baza)
export type CreateBudgetDto = Omit<Budget, 'id'>;

// Przy edycji możemy wysłać tylko część danych (Partial)
export type UpdateBudgetDto = Partial<CreateBudgetDto>;