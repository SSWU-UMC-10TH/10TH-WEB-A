import type { PAGENATION_ORDER } from "../enums/common";

export type commonResponseDto<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};

export type CursorBasedResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
  nextCursor: number;
  hasNext: boolean;
};

export type PageNationDto = {
  cursor?: number;
  limit?: number;
  search?: string;
  order?: PAGENATION_ORDER;
};