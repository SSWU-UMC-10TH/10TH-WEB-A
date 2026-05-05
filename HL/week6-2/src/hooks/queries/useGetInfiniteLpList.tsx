import { useInfiniteQuery } from "@tanstack/react-query";
import type { PAGENATION_ORDER } from "../../enums/common";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useGetInfiniteLpList(
  limit: number,
  search: string,
  order: PAGENATION_ORDER,
) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.lps, search, order],

    queryFn: ({ pageParam }) =>
      getLpList({ cursor: pageParam, limit, search, order }),

    initialPageParam: 0,

    getNextPageParam: (lastPage) => {
      // console.log(lastPage, allPages);
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
  });
}

export default useGetInfiniteLpList;