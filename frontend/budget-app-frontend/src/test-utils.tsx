import type { ReactElement, ReactNode } from 'react';
import { render as rtlRender } from '@testing-library/react'; // [1] Importujemy z inną nazwą
import type { RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  rtlRender(ui, { wrapper: AllTheProviders, ...options });

// [2] Eksportujemy wszystko poza oryginalnym renderem

export * from '@testing-library/react';
// [3] Eksportujemy nasze własne render
export { customRender as render, userEvent };
