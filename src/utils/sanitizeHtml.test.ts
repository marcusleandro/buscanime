import { describe, expect, it } from "vitest";
import { sanitizeAnilistHtml } from "./sanitizeHtml";

describe("sanitizeAnilistHtml", () => {
  it("preserves safe formatting tags", () => {
    const input = "<p>Hello <strong>world</strong></p>";
    expect(sanitizeAnilistHtml(input)).toBe(input);
  });

  it("strips script tags", () => {
    expect(sanitizeAnilistHtml("<script>alert(1)</script><p>ok</p>")).toBe(
      "<p>ok</p>"
    );
  });

  it("strips event handler attributes", () => {
    expect(sanitizeAnilistHtml('<img src="x" onerror="alert(1)">')).toBe("");
  });

  it("removes javascript: links", () => {
    const result = sanitizeAnilistHtml(
      '<a href="javascript:alert(1)">click</a>'
    );
    expect(result).not.toContain("javascript:");
  });

  it("allows https links", () => {
    const input = '<a href="https://anilist.co">AniList</a>';
    expect(sanitizeAnilistHtml(input)).toContain('href="https://anilist.co"');
  });
});
