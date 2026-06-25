import { PlusIcon } from "lucide-react";
import type { AnimeReview } from "@/services/anime";
import { Button, ErrorState, Spinner } from "@/components";
import { ReviewCard } from "./ReviewCard";

interface ReviewFeedProps {
  reviews: AnimeReview[];
  isLoading: boolean;
  isError: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  onLoadMore: () => void;
  onRetry: () => void;
  variant?: "compact" | "full";
}

export const ReviewFeed = ({
  reviews,
  isLoading,
  isError,
  isFetchingNextPage,
  hasNextPage,
  onLoadMore,
  onRetry,
  variant = "full",
}: ReviewFeedProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-xl border border-l-4 border-l-muted bg-muted/40"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return <ErrorState onRetry={onRetry} />;
  }

  if (reviews.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Nenhum review disponível para este anime.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} variant={variant} />
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

export default ReviewFeed;
