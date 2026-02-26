// src/schemas/user.ts
import { z } from 'zod';

// 1. Definiujemy kształt danych (Schema)
export const userSchema = z.object({
  id: z.number(), // Backend wysyła int
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string().optional(), // Opcjonalne, jeśli backend może zwrócić null
  roleName: z.string().optional(), // Pamiętaj o nazwie pola z backendu (chyba było RoleName?)
});

// 2. Magia Zoda: Automatycznie generujemy typ TypeScript
// Dzięki temu nie musisz pisać "interface User { ... }" ręcznie!
export type User = z.infer<typeof userSchema>;
