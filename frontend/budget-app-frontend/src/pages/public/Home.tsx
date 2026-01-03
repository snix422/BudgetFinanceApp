import React from 'react';
import { Link } from 'react-router';
import Button from '../../components/ui/Button';

const Home = () => {
  return (
    <div className='max-w-full bg-white'>
      <div className='mx-auto max-w-7xl py-12 px-6 lg:px-8 lg:py-24 flex flex-col lg:flex-row items-center gap-12'>
        {/* LEWA KOLUMNA: Tekst i CTA */}
        <div className='flex-1 text-center lg:text-left'>
          <h1 className='text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl mb-6'>
            Przejmij kontrolę nad swoim <span className='text-blue-600'>portfelem</span>.
          </h1>
          <p className='mt-6 text-lg leading-8 text-gray-600 mb-8'>
            Śledź wydatki, planuj budżety i oszczędzaj na marzenia. Dołącz do tysięcy użytkowników,
            którzy uporządkowali swoje finanse z BudgetApp. Prosto, bezpiecznie i za darmo.
          </p>
          <div className='flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4'>
            <Link to='/register' className='w-full sm:w-auto'>
              <Button size='lg' className='w-full sm:w-auto text-lg px-8 py-6'>
                Rozpocznij teraz
              </Button>
            </Link>
            <Link to='/login' className='w-full sm:w-auto'>
              <Button variant='primary' size='lg' className='w-full sm:w-auto text-lg px-8 py-6'>
                Zobacz demo
              </Button>
            </Link>
          </div>

          {/* Social Proof (Mały dodatek budujący zaufanie) */}
          <div className='mt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-500'>
            <div className='flex -space-x-2'>
              <img
                className='inline-block h-8 w-8 rounded-full ring-2 ring-white'
                src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64'
                alt=''
              />
              <img
                className='inline-block h-8 w-8 rounded-full ring-2 ring-white'
                src='https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64'
                alt=''
              />
              <img
                className='inline-block h-8 w-8 rounded-full ring-2 ring-white'
                src='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=64&h=64'
                alt=''
              />
            </div>
            <p>
              Już <span className='font-bold text-gray-900'>2,000+</span> użytkowników
            </p>
          </div>
        </div>

        {/* PRAWA KOLUMNA: Zdjęcie / Grafika */}
        <div className='flex-1 relative'>
          {/* Obrazek z cieniem i zaokrągleniem */}
          <div className='relative rounded-2xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
            <img
              src='https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop'
              alt='Aplikacja dashboard na tablecie'
              className='w-full rounded-xl shadow-2xl ring-1 ring-gray-900/10'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
