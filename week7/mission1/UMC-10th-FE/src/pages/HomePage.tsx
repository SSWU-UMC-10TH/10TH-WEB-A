import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import SideBar from './SideBar';
import { useGetInfiniteLpList } from '../hooks/queries/useGetInfiniteLpList';
import { PAGENATION_ORDER } from '../enum/commmon';
import LpSkeleton from '../pages/LpSkeleton'
import LpModal from '../pages/LpModal'

interface HomeContextType {
  isSideOpen: boolean;
  toggleSideBar: () => void;
}

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () =>{
    setIsModalOpen(!isModalOpen);
  }
  console.log(isModalOpen)

  const navigate = useNavigate();
  const { isSideOpen, toggleSideBar } = useOutletContext<HomeContextType>();

  const [search, setSearch] = useState('');
  const [order, setOrder] = useState<PAGENATION_ORDER>(PAGENATION_ORDER.desc);

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const {
    data,
    isFetching,
    isFetchingNextPage, 
    hasNextPage,
    isPending, 
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList({
    limit: 10,
    search: search,
    order: order,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] p-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <LpSkeleton key={`init-skeleton-${i}`} />
          ))}
        </div>
      </div>
    );
  }

  // 2. 에러 발생 시 UI
  if (isError) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center text-white">
        <p className="text-red-500 font-bold">데이터를 불러오는 중 에러가 발생했습니다.</p>
      </div>
    );
  }

  const allLps = data?.pages?.flatMap((page: any) => page?.data?.data || []).filter(Boolean) || [];

  return (
    <div className="flex min-h-screen bg-[#0f0f0f] relative overflow-x-hidden">
      {isSideOpen && (
        <div className="absolute z-40 h-full">
          <SideBar onClick={toggleSideBar} />
        </div>
      )}

      <main className="flex-1 p-8">
        <div className="flex flex-col md:flex-row justify-end items-center mb-10 gap-4">
          <input
            className="w-full md:w-64 bg-[#1a1a1a] text-white px-4 py-2 rounded-lg border border-gray-800 focus:outline-none focus:border-pink-500 transition-all"
            type="text"
            placeholder="앨범명 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="bg-[#1a1a1a] rounded-full p-1 flex border border-gray-800">
            <button
              onClick={() => setOrder(PAGENATION_ORDER.asc)}
              className={`px-6 py-1.5 rounded-full text-xs font-bold transition-all ${
                order === PAGENATION_ORDER.asc ? 'bg-white text-black' : 'text-gray-400'
              }`}
            >
              오래된순
            </button>
            <button
              onClick={() => setOrder(PAGENATION_ORDER.desc)}
              className={`px-6 py-1.5 rounded-full text-xs font-bold transition-all ${
                order === PAGENATION_ORDER.desc ? 'bg-white text-black' : 'text-gray-400'
              }`}
            >
              최신순
            </button>
          </div>
        </div>

        {allLps.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {allLps.map((lp: any) => (
              <div
                key={lp.id}
                className="relative aspect-square group cursor-pointer overflow-hidden rounded-md bg-[#1a1a1a] transition-all duration-300 hover:scale-105"
                onClick={() => navigate(`/lp/${lp.id}`)}
              >
                {lp.thumbnail ? (
                  <img src={lp.thumbnail} alt={lp.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600">No Image</div>
                )}

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <h3 className="text-white font-bold text-sm truncate">{lp.title}</h3>
                  <p className="text-gray-400 text-[10px] mb-1">
                    {lp.createdAt ? new Date(lp.createdAt).toLocaleDateString() : ''}
                  </p>
                  <div className="flex items-center gap-1 text-white text-xs">
                    <span className="text-pink-500">♥</span> 
                    {lp.likesCount ?? lp._count?.likes ?? 0}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-20">데이터가 없습니다.</div>
        )}

        <div ref={ref} className="mt-10 min-h-[100px]">
          {isFetchingNextPage && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <LpSkeleton key={`next-skeleton-${i}`} />
              ))}
            </div>
          )}
          {!hasNextPage && allLps.length > 0 && (
            <p className="text-center text-gray-600 py-10">모든 LP를 불러왔습니다.</p>
          )}
        </div>

        <button
          className="fixed bottom-8 right-8 w-14 h-14 bg-pink-500 rounded-full flex items-center justify-center text-white text-3xl shadow-2xl hover:bg-pink-600 transition-all active:scale-90 z-50"
          onClick={() => handleOpenModal()}
        >
          +
        </button>
        {isModalOpen && (
          <LpModal onClick={handleOpenModal}/>
        )}
      </main>
    </div>
  );
};

export default HomePage;