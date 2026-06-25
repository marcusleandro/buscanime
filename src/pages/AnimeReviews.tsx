import { useState } from "react";
import { ArrowLeftIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  ErrorState,
  PageContainer,
  ReviewFeed,
  ReviewSortFilter,
} from "@/components";
import { useAnimeReviews } from "@/hooks";
import { AnimeNotFoundError } from "@/services/anime";
import type { AnimeReviewSort } from "@/types/anime/reviewSort";
import { DEFAULT_REVIEW_SORT } from "@/types/anime/reviewSort";
import { parseAnimeId } from "@/utils/animeId";

export const AnimeReviewsPage = () => {
  const { id: idParam } = useParams<{ id: string }>();
  const animeId = parseAnimeId(idParam)!;
  const [sort, setSort] = useState<AnimeReviewSort>(DEFAULT_REVIEW_SORT);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useAnimeReviews({ animeId, sort });

  const isNotFound =
    error instanceof AnimeNotFoundError ||
    (isError && error?.message.includes("not found"));

  const firstPage = data?.pages[0];
  const animeTitle = firstPage?.title ?? "Anime";
  const isReviewBlocked = firstPage?.isReviewBlocked ?? false;

  const reviews =
    data?.pages.flatMap((page) => page.reviews) ?? [];

  return (
    <PageContainer>
      <div className="mb-6">
        <Button asChild variant="ghost" size="sm" className="-ml-2">
          <Link to={`/animes/${animeId}`}>
            <ArrowLeftIcon data-icon="inline-start" />
            Voltar para o anime
          </Link>
        </Button>
      </div>

      <div className="mb-8 flex flex-col gap-6">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">
            Reviews
          </h1>
          <p className="mt-1 text-muted-foreground">{animeTitle}</p>
        </div>

        <ReviewSortFilter value={sort} onChange={setSort} />
      </div>

      {isNotFound ? (
        <ErrorState
          title="Anime não encontrado"
          message="Não encontramos este anime. Verifique o link ou volte para a lista."
        />
      ) : isReviewBlocked ? (
        <ErrorState message="Os reviews deste anime não estão disponíveis." />
      ) : (
        <ReviewFeed
          reviews={reviews}
          isLoading={isLoading}
          isError={isError}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage ?? false}
          onLoadMore={() => void fetchNextPage()}
          onRetry={() => void refetch()}
          variant="full"
        />
      )}

      {import.meta.env.DEV && error && (
        <p className="mt-4 text-xs text-muted-foreground">{error.message}</p>
      )}
    </PageContainer>
  );
};

export default AnimeReviewsPage;
