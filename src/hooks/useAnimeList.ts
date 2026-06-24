import { useInfiniteQuery } from "@tanstack/react-query";
import animeService from "@/services/AnimeService";
import type { AnimeFormat } from "@/types";

interface UseAnimeListProps {
  search: string;
  format: AnimeFormat;
}

export const useAnimeList = ({ search, format }: UseAnimeListProps) => {
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
};

export default useAnimeList;
