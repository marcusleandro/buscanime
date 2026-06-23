import useAnimeFilters from "@/hooks/useAnimeFilters";
import useAnimeList from "@/hooks/useAnimeList";
import { Button } from "@/components/ui/button";

export const AnimeListPage = () => {
  const { search, format } = useAnimeFilters();

  const { data, isLoading, error, fetchNextPage, hasNextPage } = useAnimeList({
    search,
    format,
  });

  const animes = data?.pages.flatMap((page) => page.media) || [];

  return (
    <div>
      <h1>Anime List</h1>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {animes.length === 0 && <div>No animes found</div>}
      {animes.map((anime) => (
        <div key={anime.id}>{anime.title.romaji}</div>
      ))}
      {hasNextPage && (
        <Button onClick={() => fetchNextPage()} size="sm">
          Load more
        </Button>
      )}
    </div>
  );
};

export default AnimeListPage;
