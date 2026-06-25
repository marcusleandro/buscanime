/**
 * Returns `true` only for absolute http/https URLs safe to use in `href`/`src` attributes.
 *
 * @param url - Raw URL string from external data (e.g. AniList streaming links).
 */
export function isSafeHttpUrl(url: string): boolean {
  try {
    const { protocol } = new URL(url);
    return protocol === "https:" || protocol === "http:";
  } catch {
    return false;
  }
}
