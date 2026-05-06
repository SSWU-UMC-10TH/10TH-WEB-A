import React, { useEffect } from 'react'
import { getMyInfo } from '../apis/auth'
import type { ResponseMyInfoDto } from '../types/auth';
import { useAuth } from '../context/AuthContext';

const MyPage = () => {
  const {logout} = useAuth();
  const [data, setData] = React.useState<ResponseMyInfoDto>();

  useEffect(() => {
    const getDate = async () => {
        const response =  await getMyInfo();
        console.log(response);
        setData(response);
    };

    getDate();
  }, [])
  console.log(data?.data?.name);

  const handleLogout = async () => {
    await logout();
  }

  return (
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(128,123,255,0.18),_transparent_45%),linear-gradient(180deg,_#0b0b12_0%,_#08080d_100%)] px-4 py-10">
        <div className="w-full max-w-[420px] rounded-3xl border border-white/10 bg-white/5 px-6 py-8 text-center shadow-2xl shadow-black/40 backdrop-blur-md">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/45">My Page</p>
          <h1 className="mt-3 text-3xl font-bold text-white">{data?.data?.name ?? 'Loading...'}</h1>
          <p className="mt-3 text-sm leading-6 text-white/65">같은 스타일을 적용한 개인 정보 화면입니다.</p>
          <button
            onClick={handleLogout}
            className="mt-8 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20 hover:border-white/25"
          >
            로그아웃
          </button>
        </div>
    </div>
  );
}

export default MyPage