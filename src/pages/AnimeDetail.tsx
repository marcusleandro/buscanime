import { ArrowLeftIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import {
  AnimeDetailHero,
  AnimeDetailSkeleton,
  AnimeDetailSynopsis,
  AnimeEpisodesPreview,
  AnimeRelatedSection,
  AnimeReviewsSection,
  Button,
  ErrorState,
  PageContainer,
} from "@/components";
import { useAnimeDetail } from "@/hooks";
import { AnimeNotFoundError } from "@/services/anime";
import { parseAnimeId } from "@/utils/animeId";

export const AnimeDetail = () => {
  const { id: idParam } = useParams<{ id: string }>();
  const animeId = parseAnimeId(idParam)!;
  const { data, isLoading, isError, error, refetch } = useAnimeDetail(animeId);

  const isNotFound =
    error instanceof AnimeNotFoundError ||
    (isError && error?.message.includes("not found"));

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
