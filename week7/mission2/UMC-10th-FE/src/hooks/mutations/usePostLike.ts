import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import { Variable } from "lucide-react";
import type { RequestLpDto, ResponseLpListDto } from "../../types/lp";
import { data } from "react-router-dom";

function usePostLike() {
    return useMutation({
        mutationFn:postLike,
        //data -> API 성공 응답데이터
        //variables -> mutate에 전달한 값
        //context -> onMutate에서 반환한 값
        onSuccess: (data) => ({
            queryKey:[QUERY_KEY.lps, data.data.lpid],
            exact: true,
        }),
        // error -> 요청 실패시 발생한 에러
        // variables -> mutate에 전달한 값
        // context -> onMutate에서 반환한 값
        onError: (error : Error, variable: RequestLpDto, context)=> {},
        //요청 직전에 실행되기 직전에 실행되는 함수
        //Optimistic Update를 구현할때 우용
        onMutate: (variable : RequestLpDto) => {
            return "hello"
        },
        //요청이 끝난 후 항상 실행됨 (OnSuccess, OnError 후에 실행됨)
        //로딩 상태를 초기화할때 조금 유용하다
        onSettled: (data:ResponseLpListDto | undefined, error: Error | null, variables : RequestLpDto, context) => {}
    });
}

export default usePostLike