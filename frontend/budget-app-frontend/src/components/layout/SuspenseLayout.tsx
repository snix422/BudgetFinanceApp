import { Suspense, type ReactNode } from 'react';

interface SuspenseLayoutProps {
  children: ReactNode;
}

const SuspenseLayout = ({ children }: SuspenseLayoutProps) => (
  <Suspense fallback={<div className='p-4 text-center'>Ładowanie aplikacji...</div>}>
    {children}
  </Suspense>
);

export default SuspenseLayout;
