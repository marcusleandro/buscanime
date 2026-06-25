import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { formatReviewDate, formatReviewRating } from "./formatReviewLabels";

describe("formatReviewRating", () => {
  it("formats singular and plural helpful votes", () => {
    expect(formatReviewRating(1)).toBe("1 pessoa achou útil");
    expect(formatReviewRating(142)).toBe("142 pessoas acharam útil");
  });

  it("returns null when there are no votes", () => {
    expect(formatReviewRating(0)).toBeNull();
    expect(formatReviewRating(null)).toBeNull();
    expect(formatReviewRating(undefined)).toBeNull();
  });
});

describe("formatReviewDate", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-24T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("formats relative dates in Portuguese", () => {
    const now = Math.floor(Date.now() / 1000);
    const twoDaysAgo = now - 2 * 24 * 60 * 60;

    expect(formatReviewDate(now)).toBe("hoje");
    expect(formatReviewDate(twoDaysAgo)).toBe("há 2 dias");
  });
});
