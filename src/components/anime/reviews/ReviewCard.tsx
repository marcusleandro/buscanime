import { ExternalLinkIcon, ThumbsUpIcon, UserIcon } from "lucide-react";
import { Badge, Card } from "@/components";
import type { AnimeReview } from "@/services/anime";
import {
  formatReviewDate,
  formatReviewRating,
  getScoreColor,
  getScoreBorderColor,
  isSafeHttpUrl,
  sanitizeAnilistHtml,
} from "@/utils";
import { cn } from "@/lib/utils";
import { REVIEW_BODY_CLASSNAME } from "./reviewStyles";

interface ReviewCardProps {
  review: AnimeReview;
  variant?: "compact" | "full";
}

const filledBadgeClass =
  "h-auto shrink-0 rounded px-2 py-0.5 text-sm font-semibold text-on-filled";

export const ReviewCard = ({
  review,
  variant = "compact",
}: ReviewCardProps) => {
  const userName = review.user?.name ?? "Usuário";
  const avatarUrl = review.user?.avatar?.large;
  const ratingLabel = formatReviewRating(review.ratingAmount);
  const borderClass =
    review.score != null ? getScoreBorderColor(review.score) : "border-l-muted";

  return (
    <Card className={cn("overflow-hidden border-l-4 p-4 sm:p-5", borderClass)}>
      <div className="flex gap-3 sm:gap-4">
        <div
          className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted sm:size-11"
          aria-hidden
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt=""
              className="size-full object-cover"
              loading="lazy"
            />
          ) : (
            <UserIcon className="size-5 text-muted-foreground" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate font-medium">{userName}</p>
              <p className="text-xs text-muted-foreground">
                {formatReviewDate(review.createdAt)}
              </p>
            </div>

            {review.score != null && (
              <Badge
                className={cn(filledBadgeClass, getScoreColor(review.score))}
              >
                {review.score}%
              </Badge>
            )}
          </div>

          {review.summary && (
            <p
              className={cn(
                "mt-3 leading-snug font-medium",
                variant === "compact" && "line-clamp-3"
              )}
              title={variant === "compact" ? review.summary : undefined}
            >
              {review.summary}
            </p>
          )}

          {variant === "full" && review.body && (
            <div
              className={cn("mt-4", REVIEW_BODY_CLASSNAME)}
              dangerouslySetInnerHTML={{
                __html: sanitizeAnilistHtml(review.body),
              }}
            />
          )}

          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            {ratingLabel && (
              <span className="inline-flex items-center gap-1">
                <ThumbsUpIcon className="size-3.5" aria-hidden />
                {ratingLabel}
              </span>
            )}

            {review.siteUrl && isSafeHttpUrl(review.siteUrl) && (
              <a
                href={review.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:underline"
              >
                Ver no AniList
                <ExternalLinkIcon className="size-3" aria-hidden />
              </a>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ReviewCard;
