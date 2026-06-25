import type { ReviewSort } from "@/types/generated/anilist.schema";

export const REVIEW_SORTS = [
  "RATING_DESC",
  "CREATED_AT_DESC",
  "SCORE_DESC",
] as const satisfies readonly ReviewSort[];

export type AnimeReviewSort = (typeof REVIEW_SORTS)[number];

export const REVIEW_SORT_LABELS: Record<AnimeReviewSort, string> = {
  RATING_DESC: "Mais úteis",
  CREATED_AT_DESC: "Mais recentes",
  SCORE_DESC: "Maior nota",
};

export const DEFAULT_REVIEW_SORT: AnimeReviewSort = "RATING_DESC";
