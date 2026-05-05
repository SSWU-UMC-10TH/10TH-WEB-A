import type { PageNationDto } from "../types/common";
import type { ResponseLpDetailDto, ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";

export const getLpList = async (
  pageNationDto: PageNationDto,
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: pageNationDto,
  });
  return data;
};

export const getLpDetail = async (
  lpId: number,
): Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
  return data;
};