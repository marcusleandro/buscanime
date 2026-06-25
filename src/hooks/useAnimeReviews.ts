import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import animeService from "@/services/anime";
import type { AnimeReviewSort } from "@/types/anime/reviewSort";

interface UseAnimeReviewsProps {
  animeId: number;
  sort?: AnimeReviewSort;
  perPage?: number;
  enabled?: boolean;
}

export const useAnimeReviews = ({
  animeId,
  sort = "RATING_DESC",
  perPage = 10,
  enabled = true,
}: UseAnimeReviewsProps) => {
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
};

export const useAnimeReviewsPreview = (animeId: number) => {
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
};

export default useAnimeReviews;
