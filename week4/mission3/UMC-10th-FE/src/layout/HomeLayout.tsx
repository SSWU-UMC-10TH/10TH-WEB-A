import React from 'react'
import Nav from '../pages/Nav'
import { Outlet } from 'react-router-dom'

const HomeLayout = () => {
  return (
    <div className='h-dvh flex flex-col'>
        <Nav/>
        <main className='flex-1'>
            <Outlet />
        </main>
        <footer>푸터</footer>
    </div>
  )
}

export default HomeLayout