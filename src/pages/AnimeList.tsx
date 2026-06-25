import { useEffect, useState } from "react";
import { AnimeGrid, FormatFilter, SearchBar } from "@/components/anime";
import { PageContainer } from "@/components/layout/PageContainer";
import { useAnimeFilters } from "@/hooks/useAnimeFilters";
import { useAnimeList } from "@/hooks/useAnimeList";
import { useDebounce } from "@/hooks/useDebounce";
import type { AnimeMedia } from "@/services/anime";

export const AnimeListPage = () => {
  const { search, format, setSearch, setFormat } = useAnimeFilters();
  const [inputValue, setInputValue] = useState(search);
  const [prevSearch, setPrevSearch] = useState(search);
  const debouncedSearch = useDebounce(inputValue, 500);

  if (search !== prevSearch) {
    setPrevSearch(search);
    setInputValue(search);
  }

  useEffect(() => {
    if (debouncedSearch === inputValue) {
      setSearch(debouncedSearch || null);
    }
  }, [debouncedSearch, inputValue, setSearch]);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useAnimeList({ search, format });

  const animes =
    data?.pages.flatMap(
      (page) =>
        page.media?.filter((item): item is AnimeMedia => item != null) ?? []
    ) ?? [];

  return (
    <PageContainer>
      <div className="mb-8 flex flex-col gap-6">
        <FormatFilter
          value={format}
          onChange={(value) => void setFormat(value)}
        />
        <SearchBar
          value={inputValue}
          onChange={setInputValue}
          placeholder="Digite algo aqui..."
        />
      </div>

      <AnimeGrid
        animes={animes}
        isLoading={isLoading}
        isError={isError}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage ?? false}
        onLoadMore={() => void fetchNextPage()}
        onRetry={() => void refetch()}
        search={search}
      />

      {import.meta.env.DEV && error && (
        <p className="mt-4 text-xs text-muted-foreground">{error.message}</p>
      )}
    </PageContainer>
  );
};

export default AnimeListPage;
