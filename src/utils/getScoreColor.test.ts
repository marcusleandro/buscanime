import { describe, expect, it } from "vitest";
import { getScoreColor } from "./getScoreColor";

describe("getScoreColor", () => {
  it("returns destructive for scores below 50", () => {
    expect(getScoreColor(0)).toBe("bg-destructive");
    expect(getScoreColor(49)).toBe("bg-destructive");
  });

  it("returns secondary for scores between 50 and 80", () => {
    expect(getScoreColor(50)).toBe("bg-secondary");
    expect(getScoreColor(79)).toBe("bg-secondary");
  });

  it("returns success for scores 80 and above", () => {
    expect(getScoreColor(80)).toBe("bg-success");
    expect(getScoreColor(81)).toBe("bg-success");
    expect(getScoreColor(100)).toBe("bg-success");
  });
});
