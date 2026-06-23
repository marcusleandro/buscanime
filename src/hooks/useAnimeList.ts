import { useInfiniteQuery } from "@tanstack/react-query";
import animeService from "@/services/AnimeService";

interface UseAnimeListProps {
  search: string;
  format: string;
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

      return pageInfo.hasNextPage ? pageInfo.currentPage + 1 : undefined;
    },
  });
};

export default useAnimeList;
