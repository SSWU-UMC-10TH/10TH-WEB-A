import React, { useState } from 'react'
import Nav from '../pages/Nav'
import { Outlet } from 'react-router-dom'
import Footer from '../pages/Footer'

const HomeLayout = () => {
  const [isSideOpen, setIsSideOpen] = useState(false);

  // 사이드바 토글 함수
  const toggleSideBar = () => {
    setIsSideOpen((prev) => !prev);
  };

  return (
    <div className='h-dvh flex flex-col'>
        {/* Nav에 클릭 이벤트 함수를 props로 전달 */}
        <Nav onMenuClick={toggleSideBar} />
        <main className='flex-1 relative'>
            {/* Outlet의 context를 통해 모든 자식 페이지(HomePage 등)에 상태 전달 */}
            <Outlet context={{ isSideOpen, toggleSideBar }} />
        </main>
        <Footer />
    </div>
  )
}

export default HomeLayout