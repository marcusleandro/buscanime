/** Positive integer AniList media IDs (e.g. 15125). Rejects 0, leading zeros, and non-numeric values. */
const ANIME_ID_PATTERN = /^[1-9]\d*$/;

/**
 * Checks whether a route param is a valid AniList media ID string.
 *
 * @param idParam - Raw `:id` segment from the URL.
 */
export function isValidAnimeIdParam(
  idParam: string | undefined
): idParam is string {
  return typeof idParam === "string" && ANIME_ID_PATTERN.test(idParam);
}

/**
 * Parses a route param into a numeric AniList media ID.
 *
 * @param idParam - Raw `:id` segment from the URL.
 * @returns Parsed ID, or `null` when the param is missing or invalid.
 */
export function parseAnimeId(idParam: string | undefined): number | null {
  if (!isValidAnimeIdParam(idParam)) {
    return null;
  }

  return Number(idParam);
}

/** Loader data returned by anime detail and reviews routes. */
export interface AnimeRouteLoaderData {
  /** Validated AniList media ID from the route param. */
  animeId: number;
}
