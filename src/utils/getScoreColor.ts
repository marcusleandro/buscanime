/** Tailwind background class for anime score badges. */
export type ScoreBgClass = "bg-destructive" | "bg-secondary" | "bg-success";

/** Tailwind border class for review score accents. */
export type ScoreBorderClass =
  | "border-l-destructive"
  | "border-l-secondary"
  | "border-l-success";

/**
 * Returns the badge background class for an AniList average score.
 *
 * Thresholds: below 50 → red, 50–79 → yellow, 80+ → green.
 *
 * @param score - AniList average score (0–100).
 */
export const getScoreColor = (score: number): ScoreBgClass => {
  if (score < 50) return "bg-destructive";
  if (score < 80) return "bg-secondary";
  return "bg-success";
};

/**
 * Returns the left-border accent class for a review score.
 *
 * Uses the same thresholds as {@link getScoreColor}.
 *
 * @param score - Review score (0–100).
 */
export const getScoreBorderColor = (score: number): ScoreBorderClass => {
  if (score < 50) return "border-l-destructive";
  if (score < 80) return "border-l-secondary";
  return "border-l-success";
};
