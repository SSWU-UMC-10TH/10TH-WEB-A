import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import useGetLpList from '../hooks/queries/useGetLpList';
import SideBar from './SideBar';

// HomeLayout에서 넘겨주는 데이터의 타입 정의
interface HomeContextType {
  isSideOpen: boolean;
  toggleSideBar: () => void;
}

const HomePage = () => {
  const navigate = useNavigate();
  const { isSideOpen, toggleSideBar } = useOutletContext<HomeContextType>();
    const [order, setOrder] = useState<'desc' | 'asc'>('desc');

  const { data, isPending, error } = useGetLpList({
    cursor: 0,
    search: '',
    order: order,
    limit: 20
  });

  if (isPending) return <div className="bg-[#0f0f0f] min-h-screen" />;
  if (error) return <div className="bg-[#0f0f0f] text-white p-10 font-bold">데이터를 불러오는 중 에러가 발생했습니다.</div>;

  return (
    <div className='flex min-h-screen bg-[#0f0f0f] relative'>
      
      {/* 4. 사이드바 (HomeLayout의 상태에 따라 노출 결정) */}
      {isSideOpen && (
        <div className="absolute z-40 h-full">
          <SideBar onClick={toggleSideBar} />
        </div>
      )}

      <main className='flex-1 p-8'>
        {/* 상단 정렬 버튼 (제시해주신 이미지 UI) */}
        <div className='flex justify-end mb-6'>
          <div className='bg-white rounded-full p-1 flex shadow-md overflow-hidden'>
            <button 
              onClick={() => setOrder('asc')}
              className={`px-6 py-1.5 rounded-full text-xs font-bold transition-all ${
                order === 'asc' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              오래된순
            </button>
            <button 
              onClick={() => setOrder('desc')}
              className={`px-6 py-1.5 rounded-full text-xs font-bold transition-all ${
                order === 'desc' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              최신순
            </button>
          </div>
        </div>

        {/* 5. LP 그리드 영역 (5열 배열) */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1'>
          {data?.map((lp) => (
            <div 
              key={lp.id} 
              className='relative aspect-square group cursor-pointer overflow-hidden transition-transform duration-300 hover:scale-105 z-10'
            >
              {/* 앨범 썸네일 */}
              <img 
                key={lp.id}
                src={lp.thumbnail} 
                alt={lp.title}
                className='w-full h-full object-cover'
                onClick={() => navigate(`/lp/${lp.id}`)}
              />
              
              {/* 호버 시 나타나는 정보 레이어 */}
              <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4'>
                <h3 className='text-white font-bold text-sm truncate'>{lp.title}</h3>
                <p className='text-gray-400 text-[10px] mb-1'>
                  {new Date(lp.createdAt).toLocaleDateString()}
                </p>
                <div className='flex items-center gap-1 text-white text-xs'>
                   <span className="text-pink-500">♥</span> {lp.likes?.length || 0}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 6. 우측 하단 플로팅 버튼 (핑크색 +) */}
        <button 
          className='fixed bottom-8 right-8 w-14 h-14 bg-pink-500 rounded-full flex items-center justify-center text-white text-3xl shadow-2xl hover:bg-pink-600 transition-all z-50 transform active:scale-95'
          aria-label="Add LP"
        >
          +
        </button>
      </main>
    </div>
  );
};

export default HomePage;