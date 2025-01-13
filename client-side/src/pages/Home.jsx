import React, { useEffect } from 'react'
import Tasks from '../components/Tasks';
import MainLayout from '../layouts/MainLayout';

const Home = () => {

  return (
    <>
      <MainLayout>
        <Tasks />
      </MainLayout>
    </>
  )
}

export default Home