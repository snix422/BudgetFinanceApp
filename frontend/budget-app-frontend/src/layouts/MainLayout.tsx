import { Outlet } from 'react-router';
import Footer from '../components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

const MainLayout = () => {
  return (
    <div className='h-screen w-screen flex flex-col bg-amber-800 m-0 p-0 border-2 font-sans'>
      {/* 1. Navbar jest przyklejony na górze */}
      <Navbar />

      {/* 2. Main zajmuje resztę miejsca */}
      <main className='flex-1'>
        {/* Tutaj React Router wstrzyknie Home, Dashboard, etc. */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
