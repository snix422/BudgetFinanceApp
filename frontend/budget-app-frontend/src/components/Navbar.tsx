import { Link, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import Button from './ui/Button';
import { Wallet, LogOut, User as UserIcon, LayoutDashboard, PieChart } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logOut, logOutIsLoading } = useAuth();

  // Opcjonalne: do aktywnego linku
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    // Sticky header z efektem rozmycia (backdrop-blur)
    <header className='sticky h-[10vh] top-0 z-50 max-w-full border-b border-gray-200 bg-yellow-50 backdrop-blur-md'>
      <div className='mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
        {/* --- LEWA STRONA: LOGO --- */}
        <div className='flex items-center gap-8'>
          <Link to='/' className='flex items-center gap-2'>
            <div className='rounded-lg bg-blue-600 p-2 text-white'>
              <Wallet size={20} />
            </div>
            <span className='text-xl font-bold tracking-tight text-gray-900'>BudgetApp</span>
          </Link>

          {/* --- ŚRODEK: LINKI NAWIGACYJNE (Widoczne tylko po zalogowaniu) --- */}
          {isAuthenticated && (
            <nav className='hidden md:flex items-center gap-6'>
              <Link
                to='/dashboard'
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${isActive('/dashboard') ? 'text-blue-600' : 'text-gray-600'}`}
              >
                <div className='flex items-center gap-2'>
                  <LayoutDashboard size={16} />
                  Dashboard
                </div>
              </Link>
              <Link
                to='/budgets'
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${isActive('/budgets') ? 'text-blue-600' : 'text-gray-600'}`}
              >
                <div className='flex items-center gap-2'>
                  <PieChart size={16} />
                  Budżety
                </div>
              </Link>
            </nav>
          )}
        </div>

        {/* --- PRAWA STRONA: AKCJE UŻYTKOWNIKA --- */}
        <div className='flex items-center gap-4'>
          {isAuthenticated ? (
            // WARIANT A: ZALOGOWANY
            <>
              {/* Informacja o użytkowniku (na mobile ukrywamy maila, pokazujemy ikonkę) */}
              <div className='hidden sm:flex flex-col items-end mr-2'>
                <span className='text-sm font-medium text-gray-900'>
                  {user?.firstName ? `Witaj, ${user.firstName}` : 'Moje Konto'}
                </span>
                <span className='text-xs text-gray-500'>{user?.email}</span>
              </div>

              <Button
                variant='secondary'
                size='sm'
                onClick={() => logOut()}
                isLoading={logOutIsLoading}
                className='gap-2'
              >
                <LogOut size={16} />
                <span className='hidden sm:inline'>Wyloguj</span>
              </Button>
            </>
          ) : (
            // WARIANT B: NIEZALOGOWANY (Gość)
            <>
              <Link to='/login'>
                <Button size='sm'>Zaloguj się</Button>
              </Link>
              <Link to='/register'>
                <Button size='sm'>Załóż konto</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
