import { GraphQLClient, gql } from "graphql-request";

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
  }: GetAnimeListParams) {
    const data = await this.api.request(GET_ANIMES, {
      page,
      perPage,
      search: search || undefined,
      format: format === "ALL" ? undefined : format,
    });

    //console.log("data: ", data);

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
