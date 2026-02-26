import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';

export const ErrorPage = () => {
  const error = useRouteError();

  let title = 'Wystąpił nieoczekiwany błąd';
  let message = 'Coś poszło nie tak.';

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = 'Nie znaleziono strony (404)';
      message = 'Szukaliśmy wszędzie, ale tej strony nie ma.';
    } else if (error.status === 500) {
      title = 'Błąd serwera (500)';
      message = 'Nasz serwer ma gorszy dzień.';
    } else {
      title = `Błąd ${error.status}`;
      message = error.statusText;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4'>
      <h1 className='text-4xl font-bold text-red-600 mb-4'>{title}</h1>
      <p className='text-lg text-gray-700 mb-8'>{message}</p>

      <Link
        to='/'
        className='px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
      >
        Wróć na stronę główną
      </Link>
    </div>
  );
};
