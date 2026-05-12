import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useDeleteLike() {
    return useMutation({
        mutationFn:deleteLike,
        onSuccess: (data) => ({
        queryKey:[QUERY_KEY.lps, data.data.lpid],
        exact: true,
    })
    });
}

export default useDeleteLike