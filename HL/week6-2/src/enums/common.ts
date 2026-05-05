export const PAGENATION_ORDER = {
  asc: "asc",
  desc: "desc",
} as const;

export type PAGENATION_ORDER =
  (typeof PAGENATION_ORDER)[keyof typeof PAGENATION_ORDER];