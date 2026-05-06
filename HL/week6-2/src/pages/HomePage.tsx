import { useEffect, useState } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGENATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<PAGENATION_ORDER>(PAGENATION_ORDER.desc);

  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(10, search, order);

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  const handleToggleOrder = () => {
    setOrder((prev) =>
      prev === PAGENATION_ORDER.desc
        ? PAGENATION_ORDER.asc
        : PAGENATION_ORDER.desc,
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
        {isPending && <LpCardSkeletonList count={10} />}
        {isError && (
          <div className="col-span-full flex flex-col items-center gap-3 py-16 text-gray-400">
            <p>데이터를 불러오는 중 오류가 발생했습니다.</p>
          </div>
        )}
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}
        {isFetching && <LpCardSkeletonList count={10} />}
      </div>
      <div ref={ref} className="h-20" />
    </div>
  );
};

export default HomePage;