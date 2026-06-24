import { useQuery } from "@tanstack/react-query";
import animeService from "@/services/anime";

export const useAnimeDetail = (id: number) => {
  return useQuery({
    queryKey: ["anime", id],
    queryFn: () => animeService.getAnime(id),
    enabled: Number.isFinite(id) && id > 0,
    staleTime: 60_000,
  });
};

export default useAnimeDetail;
