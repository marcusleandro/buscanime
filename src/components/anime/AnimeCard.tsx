import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";
import type { AnimeMedia } from "@/services/anime";
import { getScoreColor } from "@/utils/getScoreColor";
import { cn } from "@/lib/utils";

interface AnimeCardProps {
  /** Anime media item from a list or related-media query. */
  anime: AnimeMedia;
}

const MAX_GENRES = 3;

const filledBadgeClass =
  "h-auto rounded px-2 py-0.5 font-normal text-on-filled";

/** Card linking to the anime detail page with cover, genres, and score badge. */
export const AnimeCard = ({ anime }: AnimeCardProps) => {
  const title = anime.title?.romaji ?? "Sem título";
  const coverUrl = anime.coverImage?.extraLarge;
  const genres = anime.genres?.filter(Boolean).slice(0, MAX_GENRES) ?? [];

  return (
    <Link
      to={`/animes/${anime.id}`}
      aria-label={`Ver detalhes de ${title}`}
      className={cn(
        "group rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      )}
    >
      <Card className="relative aspect-317/270 gap-0 overflow-hidden rounded-lg p-0 transition-shadow group-hover:shadow-lg group-focus-visible:shadow-lg">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={title}
            className="absolute inset-0 size-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
            Sem imagem
          </div>
        )}

        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-b from-black/85 to-black/17"
        />

        <div className="relative flex h-full flex-col p-7 pt-6">
          <div className="flex flex-col gap-2.5">
            <CardTitle className="line-clamp-3 text-2xl font-bold text-white">
              {title}
            </CardTitle>

            {genres.length > 0 && (
              <div className="flex flex-wrap gap-[11px]">
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

        <div className="absolute right-2 bottom-2">
          {anime.averageScore != null ? (
            <Badge
              className={cn(
                filledBadgeClass,
                "text-2xl",
                getScoreColor(anime.averageScore)
              )}
            >
              {anime.averageScore}%
            </Badge>
          ) : (
            <Badge className={cn(filledBadgeClass, "bg-secondary text-2xl")}>
              N/A
            </Badge>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default AnimeCard;
