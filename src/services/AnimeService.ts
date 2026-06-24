import { GraphQLClient, gql } from "graphql-request";
import type {
  GetAnimesQuery,
  GetAnimesQueryVariables,
  MediaFormat,
} from "@/types/generated/graphql";

export type AnimeListPage = NonNullable<GetAnimesQuery["Page"]>;
export type AnimeMedia = NonNullable<
  NonNullable<AnimeListPage["media"]>[number]
>;

export interface GetAnimeListParams {
  page: number;
  perPage?: number;
  search?: string;
  format?: string;
}

export const GET_ANIMES = gql`
  query GetAnimes(
    $page: Int
    $perPage: Int
    $search: String
    $format: MediaFormat
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        currentPage
        hasNextPage
        perPage
      }

      media(type: ANIME, search: $search, format: $format) {
        id
        title {
          romaji
        }
        coverImage {
          extraLarge
        }
        format
        averageScore
        genres
      }
    }
  }
`;

export class AnimeService {
  private readonly api: GraphQLClient;

  constructor() {
    this.api = new GraphQLClient("https://graphql.anilist.co");
  }

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
      throw new Error("Failed to fetch anime list");
    }

    return data.Page;
  }

  //   async getAnime(id: string) {
  //     const response = await this.api.request({
  //       query: gql`
  //         query GetAnime($id: ID!) {
  //           anime(id: $id) {
  //             id
  //             title {
  //               romaji
  //               english
  //               native
  //             }
  //             description
  //             episodes
  //             duration
  //           }
  //         }
  //       `,
  //     });
  //   }

  //   async getAnimeDetails(id: string) {
  //     const response = await this.api.request({
  //       query: gql`
  //         query GetAnimeDetails($id: ID!) {
  //           anime(id: $id) {
  //             id
  //             title {
  //               romaji
  //               english
  //               native
  //             }
  //             description
  //             episodes
  //             duration
  //           }
  //         }
  //       `,
  //     });
  //   }
}

export default new AnimeService();
