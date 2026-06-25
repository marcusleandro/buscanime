import { useInfiniteQuery } from "@tanstack/react-query";
import animeService from "@/services/anime";
import type { AnimeFormat } from "@/types";

/** Options for {@link useAnimeList}. */
export interface UseAnimeListProps {
  /** Title search term synced with the URL or local input. */
  search: string;
  /** Media format filter. `"ALL"` fetches every format. */
  format: AnimeFormat;
}

/**
 * Fetches a paginated, filterable anime list with infinite-scroll support.
 *
 * Each page is keyed by `search` and `format` so filter changes invalidate
 * the cache automatically.
 */
export function useAnimeList({ search, format }: UseAnimeListProps) {
  return useInfiniteQuery({
    queryKey: ["animes", search, format],

    queryFn: ({ pageParam }) =>
      animeService.getAnimes({
        page: pageParam,
        search,
        format,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const pageInfo = lastPage.pageInfo;

      if (!pageInfo?.hasNextPage || pageInfo.currentPage == null) {
        return undefined;
      }

      return pageInfo.currentPage + 1;
    },
  });
}

/** Result of {@link useAnimeList}. */
export type UseAnimeListResult = ReturnType<typeof useAnimeList>;

export default useAnimeList;
