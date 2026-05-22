import { useMutation } from "@tanstack/react-query";
import type { UseMutationOptions } from "@tanstack/react-query";
import { deleteLike } from "../../../apis/lp";
import type { RequestLpDto, ResponseLikeLpDto } from "../../types/lp";

function useDeleteLike(options?: UseMutationOptions<ResponseLikeLpDto, Error, RequestLpDto>) {
    return useMutation({
        mutationFn: deleteLike,
        ...options,
    });
}

export default useDeleteLike;
