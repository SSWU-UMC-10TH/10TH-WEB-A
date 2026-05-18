import { useInfiniteQuery } from "@tanstack/react-query";
import { PAGENATION_ORDER } from "../../enum/commmon";
import { getLpList } from "../../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

interface UseGetInfiniteLpListProps {
  limit: number;
  search: string;
  order: PAGENATION_ORDER;
}

export function useGetInfiniteLpList({ limit, search, order }: UseGetInfiniteLpListProps) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.lps, search, order],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getLpList({ cursor: pageParam, limit, search, order });
      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: any) => {
      const pagination = lastPage?.data;

      if (!pagination) return undefined;

      return pagination.hasNext ? pagination.nextCursor : undefined;
    },
    enabled: true,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}