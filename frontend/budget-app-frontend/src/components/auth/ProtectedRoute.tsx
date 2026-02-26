import useAuth from '@/hooks/useAuth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  allowedRoles?: string[];
  children: React.ReactNode;
};

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { user, isAuthLoading } = useAuth();
  const location = useLocation();
  console.log(user, 'protectedroute');

  if (isAuthLoading) {
    return <div className='h-screen w-full flex items-center justify-center'>Ładowanie...</div>;
  }
  if (!user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (allowedRoles && user.roleName && !allowedRoles.includes(user?.roleName)) {
    return <Navigate to='/' replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
