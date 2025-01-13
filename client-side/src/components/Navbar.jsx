import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <>
      <header className='flex justify-between sticky top-0 p-4 bg-white shadow-sm items-center z-50'>
        <h2 className='cursor-pointer uppercase font-medium'>
          <Link to="/">Task Manager</Link>
        </h2>
        
        <ul className='hidden md:flex gap-4 uppercase font-medium'>
          <li className="bg-blue-500 text-white hover:bg-blue-600 font-medium rounded-md">
            <Link to='/tasks/add' className='block w-full h-full px-4 py-2'>
              <i className="fa-solid fa-plus"></i> Add task
            </Link>
          </li>
        </ul>

        <div className='flex md:hidden'>
          <Link to='/tasks/add' className="bg-blue-500 text-white hover:bg-blue-600 font-medium rounded-md px-4 py-2">
            <i className="fa-solid fa-plus"></i> Add task
          </Link>
        </div>
      </header>
    </>
  );
};

export default Navbar;
