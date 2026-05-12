import { PaginationDto, ResponseLpListDto } from "../types/common"; 
import { axiosInstance } from "../apis/axios"
import type { RequestLpDto, ResponseLikeLpDto } from "../src/types/lp";

export const getLpList = async (paginationDto: PaginationDto): Promise<ResponseLpListDto> => {
    const { data } = await axiosInstance.get<ResponseLpListDto>("v1/lps", {
        params: paginationDto,
    });

    return data;
};

export const getLpDetail = async({lpid}
    :RequestLpDto): Promise<ResponseLpListDto> => {
    const { data } = await axiosInstance.get(`/v1/lps/${lpid}`)
    
    return data;
}

export const postLike = async ({lpid}:RequestLpDto):Promise<ResponseLikeLpDto>=> {
    const {data} = await axiosInstance.post(`/v1/lps/${lpid}/likes`)

    return data;
}

export const deleteLike = async ({lpid}:RequestLpDto):Promise<ResponseLikeLpDto> => {
    const {data} = await axiosInstance.delete(`/v1/lps/${lpid}/likes`)

    return data;
}

export const postLp = async (formData: FormData): Promise<any> => {
    const { data } = await axiosInstance.post("/v1/lps", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return data;
};