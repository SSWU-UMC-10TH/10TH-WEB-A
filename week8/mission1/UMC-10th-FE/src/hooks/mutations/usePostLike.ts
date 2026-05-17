import { useMutation } from "@tanstack/react-query";
import type { UseMutationOptions } from "@tanstack/react-query";
import { postLike } from "../../../apis/lp";
import type { RequestLpDto, ResponseLikeLpDto } from "../../types/lp";

function usePostLike(options?: UseMutationOptions<ResponseLikeLpDto, Error, RequestLpDto>) {
    return useMutation({
        mutationFn: postLike,
        ...options,
    });
}

export default usePostLike;
