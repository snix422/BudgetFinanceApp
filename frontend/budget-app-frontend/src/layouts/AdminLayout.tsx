import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';
import { Outlet } from 'react-router';

const AdminLayout = () => {
  return (
    <main className='font-sans'>
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default AdminLayout;
