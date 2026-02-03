import { render as rtlRender, screen as rtlScreen } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';
import type { RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { queryClient } from './lib/queryClient';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Wyłączamy powtarzanie, żeby testy nie trwały wieki
      },
    },
  });
const AllTheProviders = ({ children }: { children: ReactNode }) => {
  const queryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  rtlRender(ui, { wrapper: AllTheProviders, ...options });

// [2] Eksportujemy wszystko poza oryginalnym renderem

export * from '@testing-library/react';
export { customRender as render, userEvent, rtlScreen as screen };
