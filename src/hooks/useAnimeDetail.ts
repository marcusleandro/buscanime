import { useQuery } from "@tanstack/react-query";
import animeService from "@/services/anime";

/**
 * Fetches full detail for a single anime from the AniList API.
 *
 * The query is disabled when {@link id} is not a positive finite number.
 *
 * @param id - AniList media ID.
 */
export function useAnimeDetail(id: number) {
  return useQuery({
    queryKey: ["anime", id],
    queryFn: () => animeService.getAnime(id),
    enabled: Number.isFinite(id) && id > 0,
    staleTime: 60_000,
  });
}

/** Result of {@link useAnimeDetail}. */
export type UseAnimeDetailResult = ReturnType<typeof useAnimeDetail>;

export default useAnimeDetail;
