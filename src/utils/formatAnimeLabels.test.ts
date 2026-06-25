import { describe, expect, it } from "vitest";
import {
  formatAnimeStatus,
  formatDateRange,
  formatEpisodeCount,
  formatRelationType,
} from "./formatAnimeLabels";

describe("formatAnimeLabels", () => {
  describe("formatAnimeStatus", () => {
    it("returns Portuguese labels for known statuses", () => {
      expect(formatAnimeStatus("FINISHED")).toBe("Finalizado");
      expect(formatAnimeStatus("RELEASING")).toBe("Em exibição");
      expect(formatAnimeStatus("NOT_YET_RELEASED")).toBe("Não lançado");
    });

    it("returns null for missing status", () => {
      expect(formatAnimeStatus(null)).toBeNull();
      expect(formatAnimeStatus(undefined)).toBeNull();
    });
  });

  describe("formatRelationType", () => {
    it("returns Portuguese labels for known relation types", () => {
      expect(formatRelationType("SEQUEL")).toBe("Sequência");
      expect(formatRelationType("PREQUEL")).toBe("Prequel");
      expect(formatRelationType("SIDE_STORY")).toBe("Side story");
    });

    it("returns fallback for missing relation type", () => {
      expect(formatRelationType(null)).toBe("Relacionado");
    });
  });

  describe("formatDateRange", () => {
    it("formats start and end dates", () => {
      expect(
        formatDateRange(
          { year: 2002, month: 10, day: 3 },
          { year: 2007, month: 2, day: 8 }
        )
      ).toBe("2002/10/03 – 2007/02/08");
    });

    it("returns single date when only start is available", () => {
      expect(formatDateRange({ year: 2020, month: 4, day: null }, null)).toBe(
        "2020/04"
      );
    });
  });

  describe("formatEpisodeCount", () => {
    it("formats singular and plural episode counts", () => {
      expect(formatEpisodeCount(1)).toBe("1 episódio");
      expect(formatEpisodeCount(220)).toBe("220 episódios");
      expect(formatEpisodeCount(null)).toBe("Episódios desconhecidos");
    });
  });
});
