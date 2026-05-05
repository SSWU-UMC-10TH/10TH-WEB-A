import type { CursorBasedResponse, commonResponseDto } from "./common";

export type Tags = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userId: number;
  lpId: number;
};

export type Lp = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  tags: Tags[];
  likes: Likes[];
};

export type LpDetail = Lp & {
  author: {
    id: number;
    name: string;
    avatar: string | null;
  };
};

export type ResponseLpListDto = CursorBasedResponse<{ data: Lp[] }>;

export type ResponseLpDetailDto = commonResponseDto<LpDetail>;