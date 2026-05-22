import { PAGENATION_ORDER } from "../enum/commmon"

export type CommonResponse<T> = {
    status: boolean;
    statusCode: number;
    message: string;
    data: T;
}

export type CursorBasedResponse<T> = {
    data: T;
    nextCursor: number,
    hasNext: boolean;
}

export type PaginationDto = {
    cursor? : number,
    limit? : number,
    search? : string,
    order? : PAGENATION_ORDER
}