import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import animeService from "@/services/anime";
import type { AnimeReviewSort } from "@/types/anime/reviewSort";

/** Options for {@link useAnimeReviews}. */
export interface UseAnimeReviewsProps {
  /** AniList media ID whose reviews are fetched. */
  animeId: number;
  /** Review sort order. Defaults to `"RATING_DESC"`. */
  sort?: AnimeReviewSort;
  /** Items per page. Defaults to `10`. */
  perPage?: number;
  /** When `false`, the query is skipped. Defaults to `true`. */
  enabled?: boolean;
}

/**
 * Fetches paginated community reviews for an anime with infinite-scroll support.
 *
 * Disabled when {@link UseAnimeReviewsProps.enabled} is `false` or
 * {@link UseAnimeReviewsProps.animeId} is not a positive finite number.
 */
export function useAnimeReviews({
  animeId,
  sort = "RATING_DESC",
  perPage = 10,
  enabled = true,
}: UseAnimeReviewsProps) {
  return useInfiniteQuery({
    queryKey: ["anime-reviews", animeId, sort, perPage],
    queryFn: ({ pageParam }) =>
      animeService.getReviewsPage({
        animeId,
        page: pageParam,
        perPage,
        sort,
      }),
    initialPageParam: 1,
    enabled: enabled && Number.isFinite(animeId) && animeId > 0,
    getNextPageParam: (lastPage) => {
      const pageInfo = lastPage.pageInfo;

      if (!pageInfo?.hasNextPage || pageInfo.currentPage == null) {
        return undefined;
      }

      return pageInfo.currentPage + 1;
    },
  });
}

/**
 * Fetches a lightweight preview of the top 3 reviews (sorted by rating)
 * for the anime detail page.
 *
 * @param animeId - AniList media ID.
 */
export function useAnimeReviewsPreview(animeId: number) {
  return useQuery({
    queryKey: ["anime-reviews-preview", animeId],
    queryFn: () =>
      animeService.getReviewsPage({
        animeId,
        page: 1,
        perPage: 3,
        sort: "RATING_DESC",
      }),
    enabled: Number.isFinite(animeId) && animeId > 0,
    staleTime: 60_000,
  });
}

/** Result of {@link useAnimeReviews}. */
export type UseAnimeReviewsResult = ReturnType<typeof useAnimeReviews>;

/** Result of {@link useAnimeReviewsPreview}. */
export type UseAnimeReviewsPreviewResult = ReturnType<
  typeof useAnimeReviewsPreview
>;

export default useAnimeReviews;
