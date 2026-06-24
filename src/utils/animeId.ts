/** Positive integer AniList media IDs (e.g. 15125). Rejects 0, leading zeros, and non-numeric values. */
const ANIME_ID_PATTERN = /^[1-9]\d*$/;

export function isValidAnimeIdParam(idParam: string | undefined): idParam is string {
  return typeof idParam === "string" && ANIME_ID_PATTERN.test(idParam);
}

export function parseAnimeId(idParam: string | undefined): number | null {
  if (!isValidAnimeIdParam(idParam)) {
    return null;
  }

  return Number(idParam);
}
