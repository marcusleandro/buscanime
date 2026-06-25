import { PlusIcon } from "lucide-react";
import type { AnimeMedia } from "@/services/anime";
import {
  AnimeGridSkeleton,
  EmptyState,
  ErrorState,
  Button,
  Spinner,
} from "@/components";
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
              <Spinner data-icon="inline-start" className="mr-2 size-5" />
            ) : (
              <PlusIcon data-icon="inline-start" className="mr-2 size-5" />
            )}
            Ver mais
          </Button>
        </div>
      )}
    </div>
  );
};

export default AnimeGrid;
