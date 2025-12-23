import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';

// Layouts
import MainLayout from '../layouts/MainLayout';
import SuspenseLayout from '../components/SuspenseLayout';
//import AppLayout from '../layouts/AppLayout';

// Guards (Strażnicy)
//import { ProtectedRoute } from '../components/ProtectedRoute';

// Lazy Loading stron (Code Splitting) - to jest PRO.
// Przeglądarka pobierze kod tych stron dopiero jak user tam wejdzie.
const Home = lazy(() => import('../pages/public/Home'));
const Login = lazy(() => import('../pages/public/Login'));
//const Dashboard = lazy(() => import('../pages/app/Dashboard'));
//const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));

// Prosty loader do wyświetlania kółka ładowania przy Lazy Loadingu

export const router = createBrowserRouter([
  // 1. Ścieżki Publiczne (Landing Page, Login)
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <div>Ups! Błąd 404 lub inny crash.</div>, // Error Boundary
    children: [
      {
        index: true,
        element: (
          <SuspenseLayout>
            <Home />
          </SuspenseLayout>
        ),
      },
      {
        path: 'login',
        element: (
          <SuspenseLayout>
            <Login />
          </SuspenseLayout>
        ),
      },
      { path: 'register', element: <div>Rejestracja</div> },
    ],
  },
]);
// 2. Aplikacja Użytkownika (wymaga logowania)
/*{
    path: '/app',
    // Najpierw sprawdzamy uprawnienia, potem ładujemy Layout
    element: (
      <ProtectedRoute allowedRoles={['USER', 'ADMIN']}>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'dashboard', element: <SuspenseLayout><Dashboard /></SuspenseLayout> },
      { path: 'budgets', element: <div>Budżety</div> },
    ],
  },*/

// 3. Panel Admina (tylko dla Admina)
/*{
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={['ADMIN']}>
         
         <div style={{ background: '#f0f0f0', minHeight: '100vh' }}>Admin Panel</div>
      </ProtectedRoute>
    ),
    children: [
      { path: 'users', element: <SuspenseLayout><AdminDashboard /></SuspenseLayout> },
    ],
  },
  
  
  { path: '*', element: <Navigate to="/" replace /> }
]);*/
