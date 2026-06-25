import { gql } from "graphql-request";

/** GraphQL operations consumed by {@link AnimeService}. */

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

export const GET_ANIME = gql`
  query GetAnime($id: Int!) {
    Media(id: $id, type: ANIME) {
      id
      title {
        romaji
        english
        native
      }
      description(asHtml: true)
      coverImage {
        extraLarge
        color
      }
      bannerImage
      format
      status
      episodes
      duration
      averageScore
      genres
      season
      seasonYear
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      studios(isMain: true) {
        nodes {
          name
        }
      }
      nextAiringEpisode {
        episode
        airingAt
        timeUntilAiring
      }
      relations {
        edges {
          relationType
          node {
            id
            type
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
      streamingEpisodes {
        title
        site
        thumbnail
        url
      }
    }
  }
`;

export const GET_ANIME_REVIEWS = gql`
  query GetAnimeReviews(
    $id: Int!
    $page: Int
    $perPage: Int
    $sort: [ReviewSort]
  ) {
    Media(id: $id, type: ANIME) {
      id
      title {
        romaji
      }
      isReviewBlocked
      reviews(page: $page, perPage: $perPage, sort: $sort) {
        pageInfo {
          currentPage
          hasNextPage
          perPage
        }
        nodes {
          id
          summary
          body(asHtml: true)
          score
          rating
          ratingAmount
          createdAt
          siteUrl
          user {
            name
            avatar {
              large
            }
          }
        }
      }
    }
  }
`;
