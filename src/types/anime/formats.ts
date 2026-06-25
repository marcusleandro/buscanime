/** All supported anime format filter values, including the `"ALL"` sentinel. */
export const ANIME_FORMATS = [
  "ALL",
  "TV",
  "MOVIE",
  "TV_SHORT",
  "SPECIAL",
  "OVA",
  "ONA",
  "MUSIC",
] as const;

/**
 * Anime media format used in list filters and UI labels.
 *
 * `"ALL"` is a UI-only sentinel meaning no format filter is applied.
 */
export type AnimeFormat = (typeof ANIME_FORMATS)[number];

/** AniList media formats excluding the UI-only `"ALL"` sentinel. */
export type MediaAnimeFormat = Exclude<AnimeFormat, "ALL">;

/** Human-readable labels for each {@link AnimeFormat} value. */
export const FORMAT_LABELS: Record<AnimeFormat, string> = {
  ALL: "All Formats",
  TV: "TV Show",
  MOVIE: "Movie",
  TV_SHORT: "TV Short",
  SPECIAL: "Special",
  OVA: "OVA",
  ONA: "ONA",
  MUSIC: "Music",
};

/** Tailwind grid class shared by {@link AnimeGrid} and skeleton loaders. */
export const ANIME_GRID_CLASS =
  "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

/** Number of skeleton cards rendered during the initial list load. */
export const ANIME_GRID_SKELETON_COUNT = 12;

/**
 * Type guard for values coming from toggle groups or URL parsers.
 *
 * @param value - Raw string from user input or DOM events.
 */
export function isAnimeFormat(value: string): value is AnimeFormat {
  return (ANIME_FORMATS as readonly string[]).includes(value);
}
