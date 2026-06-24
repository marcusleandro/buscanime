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

export type AnimeFormat = (typeof ANIME_FORMATS)[number];

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

export const ANIME_GRID_CLASS =
  "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

export const ANIME_GRID_SKELETON_COUNT = 12;
