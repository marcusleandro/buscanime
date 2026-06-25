import type { ReviewSort } from "@/types/generated/anilist.schema";

/** Supported review sort options, validated against the AniList schema. */
export const REVIEW_SORTS = [
  "RATING_DESC",
  "CREATED_AT_DESC",
  "SCORE_DESC",
] as const satisfies readonly ReviewSort[];

/** Review sort order forwarded to the AniList API. */
export type AnimeReviewSort = (typeof REVIEW_SORTS)[number];

/** Human-readable labels for each {@link AnimeReviewSort} value. */
export const REVIEW_SORT_LABELS: Record<AnimeReviewSort, string> = {
  RATING_DESC: "Mais úteis",
  CREATED_AT_DESC: "Mais recentes",
  SCORE_DESC: "Maior nota",
};

/** Default sort used on the reviews page and detail preview. */
export const DEFAULT_REVIEW_SORT: AnimeReviewSort = "RATING_DESC";

/**
 * Type guard for values coming from toggle groups or local state.
 *
 * @param value - Raw string from user input or DOM events.
 */
export function isAnimeReviewSort(value: string): value is AnimeReviewSort {
  return (REVIEW_SORTS as readonly string[]).includes(value);
}
