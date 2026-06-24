/**
 * Thrown when the AniList API returns no `Media` payload for a given anime ID.
 */
export class AnimeNotFoundError extends Error {
  /** AniList media ID that was not found. */
  readonly id: number;

  constructor(id: number) {
    super(`Anime with id ${id} not found`);

    this.name = "AnimeNotFoundError";
    this.id = id;
  }
}

/**
 * Thrown when the AniList API returns no `Page` payload for an anime list request.
 */
export class AnimeListFetchError extends Error {
  /** Page number that failed to load. */
  readonly page: number;

  constructor(page: number) {
    super(`Failed to fetch anime list for page ${page}`);

    this.name = "AnimeListFetchError";
    this.page = page;
  }
}
