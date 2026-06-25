import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button, ReviewCard } from "@/components";
import { useAnimeReviewsPreview } from "@/hooks/useAnimeReviews";

interface AnimeReviewsSectionProps {
  animeId: number;
}

export const AnimeReviewsSection = ({ animeId }: AnimeReviewsSectionProps) => {
  const { data, isLoading, isError } = useAnimeReviewsPreview(animeId);

  if (isLoading) {
    return (
      <section aria-labelledby="reviews-heading">
        <div className="mb-4 h-8 w-32 animate-pulse rounded bg-muted" />
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-28 animate-pulse rounded-xl border border-l-4 border-l-muted bg-muted/40"
            />
          ))}
        </div>
      </section>
    );
  }

  if (isError || !data || data.isReviewBlocked || data.reviews.length === 0) {
    return null;
  }

  const hasMore = data.pageInfo?.hasNextPage ?? false;

  return (
    <section aria-labelledby="reviews-heading">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 id="reviews-heading" className="font-heading text-2xl font-bold">
            Reviews
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Opiniões da comunidade AniList
          </p>
        </div>

        {hasMore && (
          <Button asChild variant="outline" size="sm">
            <Link to={`/animes/${animeId}/reviews`}>
              Ver todos
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {data.reviews.map((review) => (
          <ReviewCard key={review.id} review={review} variant="compact" />
        ))}
      </div>
    </section>
  );
};

export default AnimeReviewsSection;
