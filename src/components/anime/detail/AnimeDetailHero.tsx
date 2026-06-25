import { Badge } from "@/components/ui/badge";
import type { AnimeDetail } from "@/services/anime";
import {
  formatAnimeFormat,
  formatAnimeStatus,
  formatDateRange,
  formatDuration,
  formatEpisodeCount,
  formatSeasonYear,
} from "@/utils/formatAnimeLabels";
import { getScoreColor } from "@/utils/getScoreColor";
import { cn } from "@/lib/utils";

interface AnimeDetailHeroProps {
  anime: AnimeDetail;
}

const filledBadgeClass =
  "h-auto rounded px-2 py-0.5 font-normal text-on-filled";

export const AnimeDetailHero = ({ anime }: AnimeDetailHeroProps) => {
  const title = anime.title?.romaji ?? "Sem título";
  const englishTitle = anime.title?.english;
  const nativeTitle = anime.title?.native;
  const subtitle =
    englishTitle && englishTitle !== title
      ? englishTitle
      : nativeTitle && nativeTitle !== title
        ? nativeTitle
        : null;

  const coverUrl = anime.coverImage?.extraLarge;
  const bannerUrl = anime.bannerImage ?? coverUrl;
  const genres = anime.genres?.filter(Boolean) ?? [];
  const studio = anime.studios?.nodes?.[0]?.name;
  const dateRange = formatDateRange(anime.startDate, anime.endDate);
  const seasonYear = formatSeasonYear(anime.season, anime.seasonYear);
  const statusLabel = formatAnimeStatus(anime.status);
  const formatLabel = formatAnimeFormat(anime.format);
  const durationLabel = formatDuration(anime.duration);
  const episodeLabel = formatEpisodeCount(anime.episodes);

  const metaItems = [
    episodeLabel,
    durationLabel,
    studio,
    seasonYear ?? dateRange,
    statusLabel,
    formatLabel,
  ].filter(Boolean);

  return (
    <section className="relative overflow-hidden rounded-xl">
      {bannerUrl && (
        <div className="absolute inset-0" aria-hidden>
          <img
            src={bannerUrl}
            alt=""
            className="size-full scale-105 object-cover blur-xl"
          />
          <div className="absolute inset-0 bg-linear-to-r from-background via-background/95 to-background/80" />
        </div>
      )}

      <div className="relative flex flex-col gap-6 p-6 sm:flex-row sm:items-end sm:gap-8 sm:p-8">
        <div className="mx-auto w-44 shrink-0 sm:mx-0 sm:w-52 lg:w-56">
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={title}
              className="aspect-2/3 w-full rounded-lg object-cover shadow-xl ring-1 ring-border"
            />
          ) : (
            <div className="flex aspect-2/3 w-full items-center justify-center rounded-lg bg-muted text-muted-foreground">
              Sem imagem
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div>
            <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-1 text-lg text-muted-foreground">{subtitle}</p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {anime.averageScore != null ? (
              <Badge
                className={cn(
                  filledBadgeClass,
                  "text-xl",
                  getScoreColor(anime.averageScore)
                )}
              >
                {anime.averageScore}%
              </Badge>
            ) : (
              <Badge className={cn(filledBadgeClass, "bg-secondary text-xl")}>
                N/A
              </Badge>
            )}

            {anime.status === "RELEASING" &&
              anime.nextAiringEpisode?.episode != null && (
                <Badge className={cn(filledBadgeClass, "bg-secondary text-sm")}>
                  Ep. {anime.nextAiringEpisode.episode} em breve
                </Badge>
              )}
          </div>

          {metaItems.length > 0 && (
            <p className="text-sm text-muted-foreground">
              {metaItems.join(" · ")}
            </p>
          )}

          {genres.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <Badge
                  key={genre}
                  className={cn(filledBadgeClass, "bg-primary text-xs")}
                >
                  {genre}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AnimeDetailHero;
