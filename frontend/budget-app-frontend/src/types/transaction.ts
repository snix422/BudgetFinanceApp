export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: number; // Zmienione ze string na number
  type: 'income' | 'expense';
  title: string;
  amount: number;
  date: string;
  // ... pozostałe pola (categoryId itp. mogą być opcjonalne z ?)
  categoryId?: number;
  categoryName?: string;
}

// Jeśli SelectedItem ma być tym samym co Transaction, to użyj:
// type SelectedItem = Transaction;
