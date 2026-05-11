import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from '../../apis/auth';
import { QUERY_KEY } from '../constants/key';

const Nav = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const { accessToken } = useAuth();

  const { data: userData, isSuccess } = useQuery({
    queryKey: [QUERY_KEY.user, accessToken],
    queryFn: getMyInfo,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });

  return (
    <nav className='flex justify-between items-center bg-gray-900 p-8 sticky top-0 z-50'>
      <div className="flex items-center gap-4">
        {/* 햄버거 버튼 */}
        <svg 
          onClick={onMenuClick} 
          width="40" height="40" viewBox="0 0 48 48" 
          className="text-white cursor-pointer"
        >
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M7.95 11.95h32m-32 12h32m-32 12h32"/>
        </svg>
        
        <Link to='/'>
          <h1 className='text-pink-500 text-2xl font-bold'>돌려돌려 LP판</h1>
        </Link>
      </div>
      
      <div className="flex gap-4 items-center">
        {!accessToken ? (
          <>
            <Link to='/login'><button className="text-white text-sm">로그인</button></Link>
            <Link to='/signup'><button className="bg-pink-500 text-white px-4 py-1 rounded-sm text-sm">회원가입</button></Link>
          </>
        ) : (
          <>
            {isSuccess && userData && (
              <span className="text-white text-sm">
                <span className="font-bold">{userData.data?.name}</span>님 반갑습니다.
              </span>
            )}
            <Link to='/logout'><button className="text-white text-sm">로그아웃</button></Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;