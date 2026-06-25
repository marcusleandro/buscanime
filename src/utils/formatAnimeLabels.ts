import type {
  MediaFormat,
  MediaRelation,
  MediaSeason,
  MediaStatus,
} from "@/types/generated/graphql";
import { FORMAT_LABELS, type MediaAnimeFormat } from "@/types/anime/formats";

type FuzzyDate =
  | {
      year?: number | null;
      month?: number | null;
      day?: number | null;
    }
  | null
  | undefined;

const STATUS_LABELS: Record<MediaStatus, string> = {
  FINISHED: "Finalizado",
  RELEASING: "Em exibição",
  NOT_YET_RELEASED: "Não lançado",
  CANCELLED: "Cancelado",
  HIATUS: "Hiato",
};

const RELATION_LABELS: Record<MediaRelation, string> = {
  ADAPTATION: "Adaptação",
  PREQUEL: "Prequel",
  SEQUEL: "Sequência",
  PARENT: "Obra principal",
  SIDE_STORY: "Side story",
  CHARACTER: "Personagem",
  SUMMARY: "Resumo",
  ALTERNATIVE: "Alternativo",
  SPIN_OFF: "Spin-off",
  OTHER: "Outro",
  SOURCE: "Fonte",
  COMPILATION: "Compilação",
  CONTAINS: "Contém",
};

const SEASON_LABELS: Record<MediaSeason, string> = {
  WINTER: "Inverno",
  SPRING: "Primavera",
  SUMMER: "Verão",
  FALL: "Outono",
};

/** Localized label for an AniList media status, or `null` when missing. */
export const formatAnimeStatus = (
  status: MediaStatus | null | undefined
): string | null => {
  if (!status) return null;
  return STATUS_LABELS[status] ?? status;
};

/** Localized label for a media relation type. Falls back to `"Relacionado"`. */
export const formatRelationType = (
  relationType: MediaRelation | null | undefined
): string => {
  if (!relationType) return "Relacionado";
  return RELATION_LABELS[relationType] ?? relationType;
};

/** Localized label for an AniList media format, or `null` when missing. */
export const formatAnimeFormat = (
  format: MediaFormat | null | undefined
): string | null => {
  if (!format) return null;
  return FORMAT_LABELS[format as MediaAnimeFormat] ?? format;
};

/** Formats an AniList fuzzy date as `YYYY`, `YYYY/MM`, or `YYYY/MM/DD`. */
export const formatFuzzyDate = (date: FuzzyDate): string | null => {
  if (!date?.year) return null;
  const parts: string[] = [String(date.year)];
  if (date.month) parts.push(String(date.month).padStart(2, "0"));
  if (date.day) parts.push(String(date.day).padStart(2, "0"));
  return parts.join("/");
};

/** Formats a start/end fuzzy date range with an en-dash separator. */
export const formatDateRange = (
  startDate: FuzzyDate,
  endDate: FuzzyDate
): string | null => {
  const start = formatFuzzyDate(startDate);
  const end = formatFuzzyDate(endDate);

  if (start && end) return `${start} – ${end}`;
  return start ?? end;
};

/** Formats season and year (e.g. `"Primavera 2024"`), or the year alone. */
export const formatSeasonYear = (
  season: MediaSeason | null | undefined,
  seasonYear: number | null | undefined
): string | null => {
  if (!seasonYear) return null;
  const seasonLabel = season ? SEASON_LABELS[season] : null;
  return seasonLabel ? `${seasonLabel} ${seasonYear}` : String(seasonYear);
};

/** Localized episode count label. */
export const formatEpisodeCount = (
  episodes: number | null | undefined
): string => {
  if (episodes == null) return "Episódios desconhecidos";
  if (episodes === 1) return "1 episódio";
  return `${episodes} episódios`;
};

/** Formats episode duration as `"N min/ep"`, or `null` when missing. */
export const formatDuration = (
  duration: number | null | undefined
): string | null => {
  if (!duration) return null;
  return `${duration} min/ep`;
};
