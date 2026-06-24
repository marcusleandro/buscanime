import type { MediaFormat, MediaRelation, MediaStatus } from "@/types/generated/graphql";
import { FORMAT_LABELS } from "@/types/anime/formats";

type FuzzyDate = {
  year?: number | null;
  month?: number | null;
  day?: number | null;
} | null | undefined;

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

const SEASON_LABELS: Record<string, string> = {
  WINTER: "Inverno",
  SPRING: "Primavera",
  SUMMER: "Verão",
  FALL: "Outono",
};

export const formatAnimeStatus = (status: MediaStatus | null | undefined) => {
  if (!status) return null;
  return STATUS_LABELS[status] ?? status;
};

export const formatRelationType = (
  relationType: MediaRelation | null | undefined
) => {
  if (!relationType) return "Relacionado";
  return RELATION_LABELS[relationType] ?? relationType;
};

export const formatAnimeFormat = (format: MediaFormat | null | undefined) => {
  if (!format) return null;
  return FORMAT_LABELS[format as keyof typeof FORMAT_LABELS] ?? format;
};

export const formatFuzzyDate = (date: FuzzyDate) => {
  if (!date?.year) return null;
  const parts: string[] = [String(date.year)];
  if (date.month) parts.push(String(date.month).padStart(2, "0"));
  if (date.day) parts.push(String(date.day).padStart(2, "0"));
  return parts.join("/");
};

export const formatDateRange = (
  startDate: FuzzyDate,
  endDate: FuzzyDate
) => {
  const start = formatFuzzyDate(startDate);
  const end = formatFuzzyDate(endDate);

  if (start && end) return `${start} – ${end}`;
  return start ?? end;
};

export const formatSeasonYear = (
  season: string | null | undefined,
  seasonYear: number | null | undefined
) => {
  if (!seasonYear) return null;
  const seasonLabel = season ? SEASON_LABELS[season] : null;
  return seasonLabel ? `${seasonLabel} ${seasonYear}` : String(seasonYear);
};

export const formatEpisodeCount = (episodes: number | null | undefined) => {
  if (episodes == null) return "Episódios desconhecidos";
  if (episodes === 1) return "1 episódio";
  return `${episodes} episódios`;
};

export const formatDuration = (duration: number | null | undefined) => {
  if (!duration) return null;
  return `${duration} min/ep`;
};
