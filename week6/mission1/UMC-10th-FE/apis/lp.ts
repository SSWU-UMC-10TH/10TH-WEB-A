import { PaginationDto, ResponseLpListDto } from "../types/common"; 
import { axiosInstance } from "../apis/axios"

export const getLpList = async (paginationDto: PaginationDto): Promise<ResponseLpListDto> => {
    const { data } = await axiosInstance.get<ResponseLpListDto>("v1/lps", {
        params: paginationDto,
    });

    return data;
};