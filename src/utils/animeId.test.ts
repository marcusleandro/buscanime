import { describe, expect, it } from "vitest";
import { isValidAnimeIdParam, parseAnimeId } from "./animeId";

describe("animeId", () => {
  describe("isValidAnimeIdParam", () => {
    it.each(["1", "15125", "999999999"])("accepts %s", (id) => {
      expect(isValidAnimeIdParam(id)).toBe(true);
    });

    it.each(["asas", "0", "01", "1.5", "-1", ""])("rejects %s", (id) => {
      expect(isValidAnimeIdParam(id)).toBe(false);
    });

    it("rejects undefined", () => {
      expect(isValidAnimeIdParam(undefined)).toBe(false);
    });
  });

  describe("parseAnimeId", () => {
    it("returns numeric id for valid params", () => {
      expect(parseAnimeId("15125")).toBe(15125);
    });

    it("returns null for invalid params", () => {
      expect(parseAnimeId("asas")).toBeNull();
    });
  });
});
