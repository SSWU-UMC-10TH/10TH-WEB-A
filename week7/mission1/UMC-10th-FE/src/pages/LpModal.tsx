import React from 'react'
import { set } from 'zod'

const LpModal = ({ lp, onClick }) => { 

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
      <div className='relative bg-gray-800 p-8 rounded-lg'>
        <button className='absolute top-2 right-2 text-gray-400' 
        onClick={onClick}
        > X </button>
        
        <div className="flex justify-center mb-8">
          <div className="relative w-48 h-48 shadow-[0_0_30px_rgba(0,0,0,0.5)] group">
             {/* 앨범 커버 배경 */}
            <div className="absolute inset-0 bg-[#2a2a2a] rounded-lg rotate-3"></div>
            {/* 실제 LP 판 이미지 */}
            <div className="relative w-full h-full rounded-full border-[6px] border-[#111] overflow-hidden shadow-inner flex items-center justify-center">
              <img src={lp?.thumbnail} alt={lp?.title} className="w-full h-full object-cover opacity-80" />
              <div className="absolute w-12 h-12 bg-white rounded-full border-[5px] border-[#111]"></div>
            </div>

          </div>
        </div>

        <div className='flex flex-col gap-4'>
            <input className='w-full border-2 text-gray-600 rounded-sm p-2' type="text" placeholder='LP Name' />
            <input className='w-full border-2 text-gray-600 rounded-sm p-2' type="text" placeholder='LP Content' />
            <div className='w-full flex gap-2'>
                <input className='flex-1 border-2 text-gray-600 rounded-sm p-2' type="text" placeholder='LP Tag' />
                <button className='h-10 rounded-sm w-20 bg-gray-400 text-white'>Add</button>
            </div>
        <button className='h-10 rounded-sm w-full bg-gray-400 text-white'>Add LP</button>
        </div>
      </div>
    </div>
  )
}

export default LpModal