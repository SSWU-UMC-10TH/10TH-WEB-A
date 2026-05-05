import { useState } from "react";
import { PAGENATION_ORDER } from "../enums/common";
import useGetLpList from "../hooks/queries/useGetLpList";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import { queryClient } from "../App";
import { QUERY_KEY } from "../constants/key";

const HomePage = () => {
  const [order, setOrder] = useState<PAGENATION_ORDER>(PAGENATION_ORDER.desc);

  const { data, isPending, isError, refetch } = useGetLpList({ order, limit: 50 });

  const lps = data?.data.data ?? [];

  const handleToggleOrder = () => {
    setOrder((prev) =>
      prev === PAGENATION_ORDER.desc ? PAGENATION_ORDER.asc : PAGENATION_ORDER.desc
    );
  };

  return (
    <div>
      <div className="flex justify-end gap-2 mb-4">
        <button
          onClick={handleToggleOrder}
          className={`px-3 py-1 rounded text-sm transition ${
            order === PAGENATION_ORDER.asc
              ? "bg-white text-black font-semibold"
              : "bg-white/10 text-gray-300 hover:bg-white/20"
          }`}
        >
          오래된순
        </button>
        <button
          onClick={handleToggleOrder}
          className={`px-3 py-1 rounded text-sm transition ${
            order === PAGENATION_ORDER.desc
              ? "bg-white text-black font-semibold"
              : "bg-white/10 text-gray-300 hover:bg-white/20"
          }`}
        >
          최신순
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {isPending && <LpCardSkeletonList count={8} />}
        {isError && (
          <div className="col-span-full flex flex-col items-center gap-3 py-16 text-gray-400">
            <p>데이터를 불러오는 중 오류가 발생했습니다.</p>
            <button
              onClick={() => {
                queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
                refetch();
              }}
              className="px-4 py-2 bg-white/10 rounded hover:bg-white/20 text-white text-sm transition"
            >
              다시 시도
            </button>
          </div>
        )}
        {lps.map((lp) => (
          <LpCard key={lp.id} lp={lp} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;