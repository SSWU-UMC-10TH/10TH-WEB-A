import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios'; // 또는 기존 axiosInstance 사용
import { useNavigate } from 'react-router-dom';

const LP = () => {
  const navigate = useNavigate();
  const { lpid } = useParams();

  // 상세 데이터 패칭 (키에 lpid 포함)
  const { data, isPending, error } = useQuery({
    queryKey: ['lp', lpid],
    queryFn: async () => {
      // 실제 API 엔드포인트에 맞춰 수정하세요
      const response = await axios.get(`/v1/lps/${lpid}`);
      return response.data;
    }
  });

  // 로딩/에러 상태 (목록과 동일한 패턴)
  if (isPending) return <div className="bg-[#0f0f0f] min-h-screen" />;
  if (error) return <div className="bg-[#0f0f0f] text-white p-10 font-bold text-center">정보를 불러오지 못했습니다.</div>;

  const lp = data;

  return (
    <div onClick={()=> navigate(`/lp/${lpid}`)} className="bg-[#0f0f0f] min-h-screen flex justify-center p-8">
      <div className="w-full max-w-4xl bg-[#1e1e1e] rounded-2xl p-10 shadow-2xl relative">
        
        {/* 상단 섹션: 유저 정보 및 업로드일 */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-400 overflow-hidden">
               {/* 유저 아바타 이미지가 있다면 대체 */}
               <img src="https://via.placeholder.com/40" alt="avatar" />
            </div>
            <span className="text-white font-bold text-lg">오타니안</span>
          </div>
          <span className="text-gray-400 text-sm">1일 전</span>
        </div>

        {/* 제목 및 수정/삭제 버튼 */}
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-white text-4xl font-bold">{lp.title}</h1>
          <div className="flex gap-4 text-gray-400">
            <button className="hover:text-white transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
            <button className="hover:text-red-500 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
          </div>
        </div>

        {/* 메인 썸네일 (LP 레코드 스타일 UI) */}
        <div className="flex justify-center my-12">
          <div className="relative w-80 h-80 shadow-[0_0_50px_rgba(0,0,0,0.5)] group">
             {/* 앨범 커버 배경 */}
            <div className="absolute inset-0 bg-[#2a2a2a] rounded-lg rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>
            {/* 실제 LP 판 이미지 */}
            <div className="relative w-full h-full rounded-full border-[10px] border-[#111] overflow-hidden shadow-inner flex items-center justify-center animate-spin-slow">
              <img src={lp.thumbnail} alt={lp.title} className="w-full h-full object-cover opacity-80" />
              <div className="absolute w-20 h-20 bg-white rounded-full border-[8px] border-[#111]"></div>
            </div>
          </div>
        </div>

        {/* 본문 내용 */}
        <div className="text-gray-300 leading-relaxed mb-10 text-center px-10">
          <p>{lp.content}</p>
        </div>

        {/* 태그 섹션 */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {["# 오타니안", "# 빅뱅", "# 권지용", "# 정형돈", "# 광희", "# ubermensch"].map((tag) => (
            <span key={tag} className="bg-[#2a2d37] text-gray-400 px-4 py-1 rounded-full text-sm hover:text-white cursor-pointer transition-colors">
              {tag}
            </span>
          ))}
        </div>

        {/* 좋아요 섹션 */}
        <div className="flex justify-center items-center gap-2">
          <button className="text-pink-500 hover:scale-110 transition-transform">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>
          </button>
          <span className="text-white text-2xl font-bold">{lp.likes?.length || 0}</span>
        </div>

      </div>
    </div>
  );
};

export default LP;