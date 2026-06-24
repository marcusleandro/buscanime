import { PlusIcon } from "lucide-react";
import type { AnimeMedia } from "@/services/AnimeService";
import { AnimeGridSkeleton } from "@/components/anime/AnimeCardSkeleton";
import { EmptyState } from "@/components/common/EmptyState";
import { ErrorState } from "@/components/common/ErrorState";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ANIME_GRID_CLASS } from "@/types/anime/formats";
import { AnimeCard } from "./AnimeCard";

interface AnimeGridProps {
  animes: AnimeMedia[];
  isLoading: boolean;
  isError: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  onLoadMore: () => void;
  onRetry: () => void;
  search?: string;
}

export const AnimeGrid = ({
  animes,
  isLoading,
  isError,
  isFetchingNextPage,
  hasNextPage,
  onLoadMore,
  onRetry,
  search,
}: AnimeGridProps) => {
  if (isLoading) {
    return <AnimeGridSkeleton />;
  }

  if (isError) {
    return <ErrorState onRetry={onRetry} />;
  }

  if (animes.length === 0) {
    return <EmptyState search={search} />;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className={ANIME_GRID_CLASS}>
        {animes.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>

      {hasNextPage && (
        <div className="flex justify-center">
          <Button
            variant="secondary"
            onClick={onLoadMore}
            disabled={isFetchingNextPage}
            className="h-12 w-full rounded-lg text-xl font-semibold"
          >
            {isFetchingNextPage ? (
              <Spinner data-icon="inline-start" />
            ) : (
              <PlusIcon data-icon="inline-start" />
            )}
            Ver mais
          </Button>
        </div>
      )}
    </div>
  );
};

export default AnimeGrid;
