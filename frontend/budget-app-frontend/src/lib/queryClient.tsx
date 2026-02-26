import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Dane są uznawane za świeże przez 1 minutę (nie będzie refetchu przy przełączaniu okien)
      staleTime: 1000 * 60,
      // Jeśli zapytanie padnie, spróbuj jeszcze raz tylko 1 raz (zamiast domyślnych 3)
      retry: 1,
      // Nie pobieraj ponownie danych po odzyskaniu fokusu okna (opcjonalne, zależy od preferencji)
      refetchOnWindowFocus: false,
    },
  },
});
