import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMyInfo } from '../../apis/auth';
import { QUERY_KEY } from '../constants/key';

const Nav = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const { accessToken, logout } = useAuth(); // logout 함수 추가 추출
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: userData, isSuccess } = useQuery({
    queryKey: [QUERY_KEY.user, accessToken],
    queryFn: getMyInfo,
    enabled: !!accessToken, // 토큰이 있을 때만 쿼리 실행
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  // 로그아웃을 위한 Mutation 정의
  const { mutate: handleLogout } = useMutation({
    mutationFn: async () => {
      await logout(); // Context의 로그아웃 로직 실행 (토큰 제거 등)
    },
    onSuccess: () => {
      // 1. 사용자 정보 쿼리 초기화
      queryClient.setQueryData([QUERY_KEY.user, accessToken], null);
      queryClient.removeQueries({ queryKey: [QUERY_KEY.user] });
      
      // 2. 메인 페이지로 이동
      navigate('/');
      alert('로그아웃 되었습니다.');
    },
  });

  return (
    <nav className='flex justify-between items-center bg-gray-900 p-8 sticky top-0 z-50'>
      <div className="flex items-center gap-4">
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
              <span className="text-white text-sm mr-2">
                <span className="font-bold">{userData.data?.name}</span>님 반갑습니다.
              </span>
            )}
            {/* Link 태그 대신 button의 onClick으로 로그아웃 실행 */}
            <button 
              onClick={() => handleLogout()} 
              className="text-white text-sm"
            >
              로그아웃
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;