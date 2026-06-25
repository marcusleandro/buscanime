import { GraphQLClient } from "graphql-request";

import type {
  GetAnimeQuery,
  GetAnimeQueryVariables,
  GetAnimesQuery,
  GetAnimesQueryVariables,
  GetAnimeReviewsQuery,
  GetAnimeReviewsQueryVariables,
  MediaFormat,
} from "@/types/generated/graphql";

import {
  AnimeListFetchError,
  AnimeNotFoundError,
  AnimeReviewsFetchError,
} from "./AnimeErrors";
import { GET_ANIME, GET_ANIMES, GET_ANIME_REVIEWS } from "./AnimeQueries";
import type { AnimeFormat } from "@/types/anime/formats";
import type { AnimeReviewSort } from "@/types/anime/reviewSort";

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

/** Paginated reviews payload returned by {@link AnimeService.getReviewsPage}. */
export type AnimeReviewsPage = {
  id: number;
  title: string | null;
  isReviewBlocked: boolean | null;
  pageInfo: NonNullable<
    NonNullable<GetAnimeReviewsQuery["Media"]>["reviews"]
  >["pageInfo"];
  reviews: AnimeReview[];
};

/** Single review within a paginated reviews response. */
export type AnimeReview = NonNullable<
  NonNullable<
    NonNullable<NonNullable<GetAnimeReviewsQuery["Media"]>["reviews"]>["nodes"]
  >[number]
>;

/** Filters and pagination options for {@link AnimeService.getReviewsPage}. */
export interface GetAnimeReviewsParams {
  animeId: number;
  page?: number;
  perPage?: number;
  sort?: AnimeReviewSort;
}

/** Filters and pagination options for {@link AnimeService.getAnimes}. */
export interface GetAnimeListParams {
  /** 1-based page index. */
  page: number;
  /** Number of items per page. Defaults to `12` in the service. */
  perPage?: number;
  /** Optional title search term forwarded to AniList. */
  search?: string;
  /** Media format filter. `"ALL"` is treated as no filter. */
  format?: AnimeFormat;
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

  /**
   * Fetches a paginated list of community reviews for an anime.
   *
   * @throws {AnimeNotFoundError} When no anime exists for the given ID.
   * @throws {AnimeReviewsFetchError} When the API response contains no reviews data.
   */
  async getReviewsPage({
    animeId,
    page = 1,
    perPage = 10,
    sort = "RATING_DESC",
  }: GetAnimeReviewsParams): Promise<AnimeReviewsPage> {
    const variables: GetAnimeReviewsQueryVariables = {
      id: animeId,
      page,
      perPage,
      sort: [sort],
    };

    const data = await this.api.request<
      GetAnimeReviewsQuery,
      GetAnimeReviewsQueryVariables
    >(GET_ANIME_REVIEWS, variables);

    if (!data.Media) {
      throw new AnimeNotFoundError(animeId);
    }

    if (!data.Media.reviews) {
      throw new AnimeReviewsFetchError(animeId, page);
    }

    const reviews =
      data.Media.reviews.nodes?.filter(
        (review): review is AnimeReview => review != null
      ) ?? [];

    return {
      id: data.Media.id,
      title: data.Media.title?.romaji ?? null,
      isReviewBlocked: data.Media.isReviewBlocked ?? null,
      pageInfo: data.Media.reviews.pageInfo,
      reviews,
    };
  }
}

export default new AnimeService();
