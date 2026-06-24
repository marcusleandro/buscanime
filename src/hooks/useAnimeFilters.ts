import { useQueryState, parseAsString, parseAsStringLiteral } from "nuqs";
import { ANIME_FORMATS } from "@/types/anime/formats";

const formatParser = parseAsStringLiteral(ANIME_FORMATS).withDefault("ALL");

export const useAnimeFilters = () => {
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
};

export default useAnimeFilters;
