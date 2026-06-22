import { useQueryState, parseAsString } from "nuqs";

export function useAnimeFilters() {
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("")
  );

  const [format, setFormat] = useQueryState(
    "format",
    parseAsString.withDefault("ALL")
  );

  return {
    search,
    format,
    setSearch,
    setFormat,
  };
}
