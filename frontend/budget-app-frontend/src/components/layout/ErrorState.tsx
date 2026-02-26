type ErrorStateProps = {
  message: string;
};

const ErrorState: React.FC<ErrorStateProps> = ({ message }) => {
  return (
    <div className='flex flex-col items-center justify-center p-6 bg-red-50 border border-red-200 rounded-lg text-center my-4'>
      <svg
        className='w-10 h-10 text-red-500 mb-3'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        />
      </svg>

      <h3 className='text-lg font-semibold text-red-700'>Wystąpił błąd</h3>
      <p className='text-red-600 mb-4'>{message}</p>

      {/*onRetry && (
        <button 
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium"
        >
          Spróbuj ponownie
        </button>
      )*/}
    </div>
  );
};

export default ErrorState;
