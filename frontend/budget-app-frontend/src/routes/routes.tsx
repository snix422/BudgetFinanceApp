import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy } from 'react';

// Layouts
import MainLayout from '../layouts/MainLayout';
import SuspenseLayout from '../components/SuspenseLayout';
import { ErrorPage } from '../pages/ErrorPage';
import Register from '../pages/public/Register';
import Dashboard from '../pages/app/Dashboard';
import BudgetDetails from '@/pages/app/BudgetDetails';
import ProtectedRoute from '@/components/ProtectedRoute';
import AppLayout from '@/layouts/AppLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
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
    errorElement: <ErrorPage />, // Error Boundary
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
      { path: 'register', element: <Register /> },
    ],
  },
  // 2. Aplikacja Użytkownika (wymaga logowania)
  {
    path: '/app',
    // Najpierw sprawdzamy uprawnienia, potem ładujemy Layout
    element: (
      <ProtectedRoute allowedRoles={['User', 'Admin']}>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: (
          <SuspenseLayout>
            <Dashboard />
          </SuspenseLayout>
        ),
      },
      { path: 'budgets', element: <div>Budżety</div> },
      { path: 'budgets/:id', element: <BudgetDetails /> },
    ],
  },

  // 3. Panel Admina (tylko dla Admina)
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={['Admin']}>
        <div style={{ background: '#f0f0f0', minHeight: '100vh' }}>Admin Panel</div>
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'users',
        element: (
          <SuspenseLayout>
            <AdminDashboard />
          </SuspenseLayout>
        ),
      },
    ],
  },

  { path: '*', element: <Navigate to='/' replace /> },
]);
