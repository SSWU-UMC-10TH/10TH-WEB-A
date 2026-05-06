import type { commonResponseDto } from "./common";

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

// Mission-2 무한스크롤: hasNext/nextCursor가 data 안에 중첩된 구조
export type ResponseLpListDto = commonResponseDto<{
  data: Lp[];
  hasNext: boolean;
  nextCursor: number;
}>;

export type ResponseLpDetailDto = commonResponseDto<LpDetail>;