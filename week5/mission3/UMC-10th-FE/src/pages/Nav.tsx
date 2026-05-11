import React from 'react'

const Nav = () => {
  return (
    <div className='flex justify-between bg-gray-900 p-8'>
        <h1 className='text-pink-500 text-2xl font-bold'>돌려돌려LP판</h1>
        <div className="flex gap-4">
            <button className="px-4 py-1 text-sm bg-black text-white rounded-sm">로그인</button>
            <button className="px-4 py-1 text-sm bg-pink-500 text-white rounded-sm">회원가입</button>
        </div>
    </div>
  )
}

export default Nav