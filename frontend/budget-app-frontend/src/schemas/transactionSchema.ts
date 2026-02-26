import z from 'zod';
import { ExpenseSchema } from './expenseSchema';

export const TransactionSchema = ExpenseSchema.extend({
  type: z.string(),
});
