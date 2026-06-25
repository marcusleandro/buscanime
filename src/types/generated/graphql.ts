/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** The format the media was released in */
export type MediaFormat =
  /** Professionally published manga with more than one chapter */
  | 'MANGA'
  /** Anime movies with a theatrical release */
  | 'MOVIE'
  /** Short anime released as a music video */
  | 'MUSIC'
  /** Written books released as a series of light novels */
  | 'NOVEL'
  /** (Original Net Animation) Anime that have been originally released online or are only available through streaming services. */
  | 'ONA'
  /** Manga with just one chapter */
  | 'ONE_SHOT'
  /** (Original Video Animation) Anime that have been released directly on DVD/Blu-ray without originally going through a theatrical release or television broadcast */
  | 'OVA'
  /** Special episodes that have been included in DVD/Blu-ray releases, picture dramas, pilots, etc */
  | 'SPECIAL'
  /** Anime broadcast on television */
  | 'TV'
  /** Anime which are under 15 minutes in length and broadcast on television */
  | 'TV_SHORT';

/** Type of relation media has to its parent. */
export type MediaRelation =
  /** An adaption of this media into a different format */
  | 'ADAPTATION'
  /** An alternative version of the same media */
  | 'ALTERNATIVE'
  /** Shares at least 1 character */
  | 'CHARACTER'
  /** Version 2 only. */
  | 'COMPILATION'
  /** Version 2 only. */
  | 'CONTAINS'
  /** Other */
  | 'OTHER'
  /** The media a side story is from */
  | 'PARENT'
  /** Released before the relation */
  | 'PREQUEL'
  /** Released after the relation */
  | 'SEQUEL'
  /** A side story of the parent media */
  | 'SIDE_STORY'
  /** Version 2 only. The source material the media was adapted from */
  | 'SOURCE'
  /** An alternative version of the media with a different primary focus */
  | 'SPIN_OFF'
  /** A shortened and summarized version */
  | 'SUMMARY';

export type MediaSeason =
  /** Predominantly started airing between October and November */
  | 'FALL'
  /** Predominantly started airing between April and June */
  | 'SPRING'
  /** Predominantly started airing between July and September */
  | 'SUMMER'
  /** Predominantly started airing between January and March */
  | 'WINTER';

/** The current releasing status of the media */
export type MediaStatus =
  /** Ended before the work could be finished */
  | 'CANCELLED'
  /** Has completed and is no longer being released */
  | 'FINISHED'
  /** Version 2 only. Is currently paused from releasing and will resume at a later date */
  | 'HIATUS'
  /** To be released at a later date */
  | 'NOT_YET_RELEASED'
  /** Currently releasing */
  | 'RELEASING';

/** Media type enum, anime or manga. */
export type MediaType =
  /** Japanese Anime */
  | 'ANIME'
  /** Asian comic */
  | 'MANGA';

/** Review sort enums */
export type ReviewSort =
  | 'CREATED_AT'
  | 'CREATED_AT_DESC'
  | 'ID'
  | 'ID_DESC'
  | 'RATING'
  | 'RATING_DESC'
  | 'SCORE'
  | 'SCORE_DESC'
  | 'UPDATED_AT'
  | 'UPDATED_AT_DESC';

export type GetAnimesQueryVariables = Exact<{
  page?: number | null | undefined;
  perPage?: number | null | undefined;
  search?: string | null | undefined;
  format?: MediaFormat | null | undefined;
}>;


export type GetAnimesQuery = { Page: { pageInfo: { currentPage: number | null, hasNextPage: boolean | null, perPage: number | null } | null, media: Array<{ id: number, format: MediaFormat | null, averageScore: number | null, genres: Array<string | null> | null, title: { romaji: string | null } | null, coverImage: { extraLarge: string | null } | null } | null> | null } | null };

export type GetAnimeQueryVariables = Exact<{
  id: number;
}>;


export type GetAnimeQuery = { Media: { id: number, description: string | null, bannerImage: string | null, format: MediaFormat | null, status: MediaStatus | null, episodes: number | null, duration: number | null, averageScore: number | null, genres: Array<string | null> | null, season: MediaSeason | null, seasonYear: number | null, title: { romaji: string | null, english: string | null, native: string | null } | null, coverImage: { extraLarge: string | null, color: string | null } | null, startDate: { year: number | null, month: number | null, day: number | null } | null, endDate: { year: number | null, month: number | null, day: number | null } | null, studios: { nodes: Array<{ name: string } | null> | null } | null, nextAiringEpisode: { episode: number, airingAt: number, timeUntilAiring: number } | null, relations: { edges: Array<{ relationType: MediaRelation | null, node: { id: number, type: MediaType | null, format: MediaFormat | null, averageScore: number | null, genres: Array<string | null> | null, title: { romaji: string | null } | null, coverImage: { extraLarge: string | null } | null } | null } | null> | null } | null, streamingEpisodes: Array<{ title: string | null, site: string | null, thumbnail: string | null, url: string | null } | null> | null } | null };

export type GetAnimeReviewsQueryVariables = Exact<{
  id: number;
  page?: number | null | undefined;
  perPage?: number | null | undefined;
  sort?: Array<ReviewSort | null | undefined> | ReviewSort | null | undefined;
}>;


export type GetAnimeReviewsQuery = { Media: { id: number, isReviewBlocked: boolean | null, title: { romaji: string | null } | null, reviews: { pageInfo: { currentPage: number | null, hasNextPage: boolean | null, perPage: number | null } | null, nodes: Array<{ id: number, summary: string | null, body: string | null, score: number | null, rating: number | null, ratingAmount: number | null, createdAt: number, siteUrl: string | null, user: { name: string, avatar: { large: string | null } | null } | null } | null> | null } | null } | null };
