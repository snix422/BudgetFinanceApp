import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, className, type, label, error, ...props }, ref) => {
    return (
      <div className='w-full space-y-2'>
        {/* Renderujemy Label tylko jeśli został podany */}
        {label && (
          <label
            htmlFor={id}
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700'
          >
            {label}
          </label>
        )}

        <input
          id={id}
          type={type}
          className={cn(
            // Podstawowe style inputa (wygląd jak w nowoczesnych UI kits)
            'flex h-10 w-full rounded-md border border-gray-300 text-black bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
            // Jeśli jest błąd, zmieniamy kolor ramki na czerwony
            error && 'border-red-500 focus:ring-red-500',
            className,
          )}
          ref={ref}
          {...props}
        />

        {/* Renderujemy błąd tylko jeśli istnieje */}
        {error && (
          <p className='text-sm text-red-500 font-medium animate-in fade-in slide-in-from-top-1'>
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
