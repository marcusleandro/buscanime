import { ArrowLeftIcon } from "lucide-react";
import { Link, useLoaderData } from "react-router-dom";
import {
  AnimeDetailHero,
  AnimeDetailSkeleton,
  AnimeDetailSynopsis,
  AnimeEpisodesPreview,
  AnimeRelatedSection,
  AnimeReviewsSection,
} from "@/components/anime/detail";
import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/common/ErrorState";
import { PageContainer } from "@/components/layout/PageContainer";
import { useAnimeDetail } from "@/hooks/useAnimeDetail";
import { AnimeNotFoundError } from "@/services/anime";
import type { AnimeRouteLoaderData } from "@/utils/animeId";

/** Anime detail page with synopsis, reviews preview, episodes, and related media. */
export const AnimeDetail = () => {
  const { animeId } = useLoaderData() as AnimeRouteLoaderData;
  const { data, isLoading, isError, error, refetch } = useAnimeDetail(animeId);

  const isNotFound = error instanceof AnimeNotFoundError;

  return (
    <PageContainer>
      <div className="mb-6">
        <Button asChild variant="ghost" size="sm" className="-ml-2">
          <Link to="/animes">
            <ArrowLeftIcon data-icon="inline-start" />
            Voltar para lista
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <AnimeDetailSkeleton />
      ) : isNotFound ? (
        <ErrorState
          title="Anime não encontrado"
          message="Não encontramos este anime. Verifique o link ou volte para a lista."
        />
      ) : isError ? (
        <ErrorState
          message="Não foi possível carregar os detalhes deste anime."
          onRetry={() => void refetch()}
        />
      ) : data ? (
        <div className="flex flex-col gap-10">
          <AnimeDetailHero anime={data} />
          <AnimeDetailSynopsis description={data.description} />
          <AnimeReviewsSection animeId={data.id} />
          <AnimeEpisodesPreview
            episodes={data.episodes}
            duration={data.duration}
            streamingEpisodes={data.streamingEpisodes}
          />
          <AnimeRelatedSection relations={data.relations} />
        </div>
      ) : null}

      {import.meta.env.DEV && error && (
        <p className="mt-4 text-xs text-muted-foreground">{error.message}</p>
      )}
    </PageContainer>
  );
};

export default AnimeDetail;
