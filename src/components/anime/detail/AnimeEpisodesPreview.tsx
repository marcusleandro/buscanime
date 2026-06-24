import { ArrowRightIcon, ExternalLinkIcon, PlayIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button, Card, CardTitle } from "@/components";
import type { AnimeDetail } from "@/services/anime";
import { formatDuration, formatEpisodeCount } from "@/utils/formatAnimeLabels";
import { cn } from "@/lib/utils";

interface AnimeEpisodesPreviewProps {
  animeId: number;
  episodes: AnimeDetail["episodes"];
  duration: AnimeDetail["duration"];
  streamingEpisodes: AnimeDetail["streamingEpisodes"];
}

const PREVIEW_COUNT = 6;

export const AnimeEpisodesPreview = ({
  animeId,
  episodes,
  duration,
  streamingEpisodes,
}: AnimeEpisodesPreviewProps) => {
  const streaming =
    streamingEpisodes?.filter(
      (item): item is NonNullable<typeof item> => item != null
    ) ?? [];

  const previewItems =
    streaming.length > 0
      ? streaming.slice(0, PREVIEW_COUNT).map((episode, index) => ({
          key: `${episode.url ?? episode.title ?? index}`,
          title: episode.title ?? `Episódio ${index + 1}`,
          thumbnail: episode.thumbnail,
          url: episode.url,
          site: episode.site,
          isExternal: true,
        }))
      : Array.from(
          { length: Math.min(episodes ?? 0, PREVIEW_COUNT) },
          (_, index) => ({
            key: `ep-${index + 1}`,
            title: `Ep. ${index + 1}`,
            thumbnail: null,
            url: null,
            site: null,
            isExternal: false,
          })
        );

  const hasEpisodes = (episodes ?? 0) > 0 || streaming.length > 0;

  if (!hasEpisodes) return null;

  return (
    <section aria-labelledby="episodes-heading">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 id="episodes-heading" className="font-heading text-2xl font-bold">
            Episódios
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {formatEpisodeCount(episodes)}
            {duration ? ` · ${formatDuration(duration)}` : ""}
          </p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link to={`/animes/${animeId}/episodes`}>
            Ver todos
            <ArrowRightIcon data-icon="inline-end" />
          </Link>
        </Button>
      </div>

      {previewItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {previewItems.map((item) =>
            item.isExternal && item.url ? (
              <a
                key={item.key}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group flex h-full rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                )}
              >
                <EpisodePreviewCard
                  title={item.title}
                  thumbnail={item.thumbnail}
                  site={item.site}
                  external
                />
              </a>
            ) : (
              <div key={item.key} className="h-full">
                <EpisodePreviewCard
                  title={item.title}
                  thumbnail={item.thumbnail}
                />
              </div>
            )
          )}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          Nenhum episódio disponível para preview.
        </p>
      )}
    </section>
  );
};

interface EpisodePreviewCardProps {
  title: string;
  thumbnail: string | null | undefined;
  site?: string | null;
  external?: boolean;
}

const EpisodePreviewCard = ({
  title,
  thumbnail,
  site,
  external,
}: EpisodePreviewCardProps) => (
  <Card className="flex h-full flex-col gap-0 overflow-hidden rounded-lg p-0 transition-shadow group-hover:shadow-md">
    <div className="relative aspect-video shrink-0 bg-muted">
      {thumbnail ? (
        <img
          src={thumbnail}
          alt=""
          aria-hidden
          className="size-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="flex size-full items-center justify-center">
          <PlayIcon className="size-8 text-muted-foreground" aria-hidden />
        </div>
      )}
      {external && (
        <ExternalLinkIcon
          className="absolute top-2 right-2 size-4 text-white drop-shadow"
          aria-hidden
        />
      )}
    </div>
    <div className="flex flex-col p-2">
      <CardTitle className="line-clamp-2 min-h-8 text-xs leading-4 font-medium">
        {title}
      </CardTitle>
      <p className="mt-1 h-4 truncate text-xs text-muted-foreground">
        {site ?? "\u00A0"}
      </p>
    </div>
  </Card>
);

export default AnimeEpisodesPreview;
