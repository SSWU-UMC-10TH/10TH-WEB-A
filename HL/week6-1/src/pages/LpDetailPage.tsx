import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import LpCardSkeleton from "../components/LpCard/LpCardSkeleton";
import { queryClient } from "../App";
import { QUERY_KEY } from "../constants/key";

function formatRelativeDate(date: Date | string) {
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  return `${days}일 전`;
}

const LpDetailPage = () => {
  const { lpid } = useParams<{ lpid: string }>();
  const { data, isPending, isError, refetch } = useGetLpDetail(Number(lpid));

  if (isPending) {
    return (
      <div className="max-w-lg mx-auto grid grid-cols-1 gap-4 p-4">
        <LpCardSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-gray-400">
        <p>데이터를 불러오는 중 오류가 발생했습니다.</p>
        <button
          onClick={() => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lp, Number(lpid)] });
            refetch();
          }}
          className="px-4 py-2 bg-white/10 rounded hover:bg-white/20 text-white text-sm transition"
        >
          다시 시도
        </button>
      </div>
    );
  }

  const lp = data?.data;
  if (!lp) return null;

  return (
    <div className="max-w-lg mx-auto py-8 px-4">
      {/* 작성자 정보 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {lp.author?.avatar ? (
            <img src={lp.author.avatar} alt={lp.author.name} className="w-8 h-8 rounded-full object-cover" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#f472b6] flex items-center justify-center text-white text-xs font-bold">
              {lp.author?.name?.[0] ?? "?"}
            </div>
          )}
          <span className="text-sm text-gray-300">{lp.author?.name}</span>
        </div>
        <span className="text-xs text-gray-500">{formatRelativeDate(lp.createdAt)}</span>
      </div>

      {/* 제목 */}
      <h1 className="text-xl font-bold mb-4">{lp.title}</h1>

      {/* 수정/삭제 버튼 */}
      <div className="flex justify-end gap-2 mb-4">
        <button className="p-2 rounded hover:bg-white/10 transition text-gray-400 hover:text-white" title="수정">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
        <button className="p-2 rounded hover:bg-white/10 transition text-gray-400 hover:text-red-400" title="삭제">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
        </button>
      </div>

      {/* 썸네일 */}
      <div className="flex justify-center mb-6">
        <img
          src={lp.thumbnail}
          alt={lp.title}
          className="w-64 h-64 rounded-full object-cover shadow-2xl"
        />
      </div>

      {/* 본문 */}
      <p className="text-gray-300 text-sm leading-relaxed mb-6">{lp.content}</p>

      {/* 태그 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {lp.tags.map((tag) => (
          <span key={tag.id} className="px-2 py-1 rounded-full bg-white/10 text-gray-300 text-xs">
            #{tag.name}
          </span>
        ))}
      </div>

      {/* 좋아요 버튼 */}
      <div className="flex justify-center">
        <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#f472b6]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span>{lp.likes.length}</span>
        </button>
      </div>
    </div>
  );
};

export default LpDetailPage;