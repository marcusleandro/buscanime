/**
 * Formats a review timestamp as a relative date string in Portuguese.
 *
 * @param timestamp - Unix timestamp in **seconds** (AniList convention).
 */
export const formatReviewDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const now = Date.now();
  const diffMs = now - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 1) return "hoje";
  if (diffDays === 1) return "há 1 dia";
  if (diffDays < 30) return `há ${diffDays} dias`;

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths === 1) return "há 1 mês";
  if (diffMonths < 12) return `há ${diffMonths} meses`;

  const diffYears = Math.floor(diffDays / 365);
  if (diffYears === 1) return "há 1 ano";
  return `há ${diffYears} anos`;
};

/**
 * Formats the "useful rating" count shown on review cards.
 *
 * @param ratingAmount - Number of users who marked the review as useful.
 * @returns Localized label, or `null` when the count is zero or missing.
 */
export const formatReviewRating = (
  ratingAmount: number | null | undefined
): string | null => {
  if (ratingAmount == null || ratingAmount <= 0) return null;
  if (ratingAmount === 1) return "1 pessoa achou útil";
  return `${ratingAmount} pessoas acharam útil`;
};
