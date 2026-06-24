import { GraphQLClient } from "graphql-request";

import type {
  GetAnimeQuery,
  GetAnimeQueryVariables,
  GetAnimesQuery,
  GetAnimesQueryVariables,
  MediaFormat,
} from "@/types/generated/graphql";

import { AnimeListFetchError, AnimeNotFoundError } from "./AnimeErrors";
import { GET_ANIME, GET_ANIMES } from "./AnimeQueries";

/** AniList `Page` payload returned by {@link AnimeService.getAnimes}. */
export type AnimeListPage = NonNullable<GetAnimesQuery["Page"]>;

/** Single anime item within a paginated list response. */
export type AnimeMedia = NonNullable<
  NonNullable<AnimeListPage["media"]>[number]
>;

/** Full anime detail payload returned by {@link AnimeService.getAnime}. */
export type AnimeDetail = NonNullable<GetAnimeQuery["Media"]>;

/** Related media edge attached to an {@link AnimeDetail}. */
export type AnimeRelationEdge = NonNullable<
  NonNullable<NonNullable<AnimeDetail["relations"]>["edges"]>[number]
>;

/** Filters and pagination options for {@link AnimeService.getAnimes}. */
export interface GetAnimeListParams {
  /** 1-based page index. */
  page: number;
  /** Number of items per page. Defaults to `12` in the service. */
  perPage?: number;
  /** Optional title search term forwarded to AniList. */
  search?: string;
  /** Media format filter. `"ALL"` is treated as no filter. */
  format?: string;
}

/**
 * Client for anime data backed by the [AniList GraphQL API](https://graphql.anilist.co).
 *
 * Exposed as a singleton via the module default export.
 */
export class AnimeService {
  private readonly api: GraphQLClient;

  constructor() {
    this.api = new GraphQLClient("https://graphql.anilist.co");
  }

  /**
   * Fetches a paginated list of anime.
   *
   * @param params - Pagination and filter options.
   * @param params.page - 1-based page index.
   * @param params.perPage - Items per page. Defaults to `12`.
   * @param params.search - Optional title search term.
   * @param params.format - Optional format filter. `"ALL"` is treated as no filter.
   *
   * @returns An AniList `Page` object with `pageInfo` and `media`.
   *
   * @throws {AnimeListFetchError} When the API response contains no `Page` data.
   */
  async getAnimes({
    page = 1,
    perPage = 12,
    search,
    format,
  }: GetAnimeListParams): Promise<AnimeListPage> {
    const variables: GetAnimesQueryVariables = {
      page,
      perPage,
      search: search || undefined,
      format: format === "ALL" || !format ? undefined : (format as MediaFormat),
    };

    const data = await this.api.request<
      GetAnimesQuery,
      GetAnimesQueryVariables
    >(GET_ANIMES, variables);

    if (!data.Page) {
      throw new AnimeListFetchError(page);
    }

    return data.Page;
  }

  /**
   * Fetches full detail for a single anime.
   *
   * @param id - AniList media ID.
   *
   * @returns An AniList `Media` object with synopsis, relations, and streaming data.
   *
   * @throws {AnimeNotFoundError} When no anime exists for the given ID.
   */
  async getAnime(id: number): Promise<AnimeDetail> {
    const data = await this.api.request<GetAnimeQuery, GetAnimeQueryVariables>(
      GET_ANIME,
      { id }
    );

    if (!data.Media) {
      throw new AnimeNotFoundError(id);
    }

    return data.Media;
  }
}

export default new AnimeService();
