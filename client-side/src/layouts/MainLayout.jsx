import React from 'react';
import Navbar from '../components/Navbar';

const MainLayout = ({ children }) => {
  return (
    <>
      <div className='relative bg-gray-50 h-screen w-screen overflow-x-hidden'>
        <Navbar />
        <div className="pt-16">
          {children}
        </div>
      </div>
    </>
  );
};

export default MainLayout;
