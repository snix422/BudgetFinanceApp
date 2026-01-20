import useAuth from '@/hooks/useAuth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  allowedRoles?: string[]; // Tablica ról, np. ['ADMIN', 'USER']
  children: React.ReactNode;
};

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { user, isAuthLoading } = useAuth(); // Pobieramy usera z Contextu
  const location = useLocation();
  console.log(user, 'protectedroute');
  // 1. Sprawdź, czy użytkownik jest w ogóle zalogowany

  if (isAuthLoading) {
    return <div className='h-screen w-full flex items-center justify-center'>Ładowanie...</div>;
    // Lub po prostu return null; jeśli nie chcesz mrugania
  }
  if (!user) {
    // Jeśli nie, odeślij do logowania, ale zapamiętaj skąd przyszedł (state: { from... })
    // żeby po zalogowaniu wrócił w to samo miejsce
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  // 2. Sprawdź czy ma odpowiednią rolę (jeśli allowedRoles są podane)
  if (allowedRoles && user.roleName && !allowedRoles.includes(user?.roleName)) {
    // Użytkownik jest zalogowany, ale nie ma uprawnień (np. User chce wejść do Admina)
    return <Navigate to='/' replace />;
  }

  // 3. Wszystko OK - wyświetl treść (Outlet to "dzieci" z routera)
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
