import React from 'react'
import { Link } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className='w-xs h-full bg-gray-900 text-white'>
        <div className='flex flex-col gap-4 align-items-center p-6'>
            <button className="text-md bg-gray-900 text-white text-left">찾기</button>
            <Link to='/mypage'>
                <button className="text-md bg-gray-900 text-white">마이페이지</button>
            </Link>
            <button className='text-white '>탈퇴하기</button>
        </div>
    </div>
  )
}

export default SideBar
