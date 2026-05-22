import React, { useState } from 'react'
import Nav from '../pages/Nav'
import { Outlet } from 'react-router-dom'
import Footer from '../pages/Footer'
import useSidebar from '../hooks/useSidebar'

const HomeLayout = () => {
  const { isSideOpen, open, close, toggle } = useSidebar()

  return (
    <div className='h-dvh flex flex-col'>
        <Nav onMenuClick={toggle} />
        <main className='flex-1 relative'>
            <Outlet context={{ isSideOpen, open, close, toggle }} />
        </main>
        <Footer />
    </div>
  )
}

export default HomeLayout