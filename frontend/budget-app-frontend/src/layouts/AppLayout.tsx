import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { Outlet } from 'react-router';

const AppLayout = () => {
  return (
    <main className='font-sans'>
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default AppLayout;
