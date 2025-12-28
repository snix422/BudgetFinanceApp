import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/queryClient';
import { RouterProvider } from 'react-router-dom';
import { router } from '../routes/routes';
import { Toaster } from 'sonner';

const AppProvider = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster richColors position='top-right' />
    </QueryClientProvider>
  );
};

export default AppProvider;
