import SignInForm from '@/components/auth/SignInForm';
import { Link } from 'react-router';

const Login = () => {
  return (
    <div className='flex w-full h-[85vh] bg-white'>
      {/* --- LEWA STRONA: Formularz --- */}
      {/* Na mobile: 100% szerokości (w-full). Na desktopie: 50% (lg:w-1/2) */}
      <div className='flex w-full flex-col justify-center items-center bg-white px-8 lg:w-1/2 lg:px-16 xl:px-24'>
        <div className='w-full max-w-md space-y-8'>
          {/* Nagłówek sekcji logowania */}
          <div>
            <h1 className='text-3xl font-bold tracking-tight text-gray-900'>Witaj w BudgetApp</h1>
            <p className='mt-2 text-sm text-gray-600'>
              Nie masz jeszcze konta?{' '}
              <Link
                to='/register'
                className='font-semibold text-blue-600 hover:text-blue-500 transition-colors'
              >
                Załóż je za darmo
              </Link>
            </p>
          </div>

          {/* Twój komponent formularza */}
          <SignInForm />

          {/* Stopka (opcjonalnie, np. linki prawne) */}
          <p className='text-center text-xs text-gray-500 mt-6'>
            Logując się akceptujesz{' '}
            <a href='#' className='underline hover:text-gray-800'>
              Regulamin
            </a>{' '}
            oraz{' '}
            <a href='#' className='underline hover:text-gray-800'>
              Politykę Prywatności
            </a>
            .
          </p>
        </div>
      </div>

      {/* --- PRAWA STRONA: Zdjęcie --- */}
      {/* Hidden na mobile (hidden), widoczne na dużym ekranie (lg:block). Szerokość 50% */}
      <div className='hidden lg:block lg:w-1/2 relative bg-gray-900'>
        {/* Zdjęcie tła (z Unsplash - finanse/biuro) */}
        <img
          className='absolute inset-0 h-full w-full object-cover opacity-90'
          src='https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2071&auto=format&fit=crop'
          alt='Finanse i budżet'
        />

        {/* Ciemny overlay (żeby tekst był czytelny) */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent' />

        {/* Tekst na zdjęciu (Cytat lub USP) */}
        <div className='absolute bottom-0 left-0 p-12 text-white'>
          <blockquote className='space-y-2'>
            <p className='text-lg font-medium leading-relaxed'>
              "Dzięki BudgetApp wreszcie wiem, gdzie uciekają moje pieniądze. To najlepsze narzędzie
              do kontroli domowego budżetu, jakiego używałem."
            </p>
            <footer className='text-sm font-semibold opacity-90'>
              — Michał, użytkownik Premium
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default Login;
