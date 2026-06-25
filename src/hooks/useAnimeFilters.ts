import { useQueryState, parseAsString, parseAsStringLiteral } from "nuqs";
import { ANIME_FORMATS } from "@/types/anime/formats";

const formatParser = parseAsStringLiteral(ANIME_FORMATS).withDefault("ALL");

/**
 * Syncs anime list filters with URL query parameters via `nuqs`.
 *
 * Query keys: `search` (string, default `""`) and `format` (see {@link AnimeFormat}, default `"ALL"`).
 */
export function useAnimeFilters() {
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("")
  );

  const [format, setFormat] = useQueryState("format", formatParser);

  return {
    search,
    format,
    setSearch,
    setFormat,
  };
}

/** State and setters exposed by {@link useAnimeFilters}. */
export type UseAnimeFiltersReturn = ReturnType<typeof useAnimeFilters>;

export default useAnimeFilters;
