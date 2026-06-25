import { describe, expect, it } from "vitest";
import { isSafeHttpUrl } from "./isSafeHttpUrl";

describe("isSafeHttpUrl", () => {
  it.each([
    "https://anilist.co/review/1",
    "http://example.com/path",
    "https://www.crunchyroll.com/watch/EP1",
  ])("accepts %s", (url) => {
    expect(isSafeHttpUrl(url)).toBe(true);
  });

  it.each([
    "javascript:alert(1)",
    "data:text/html,<script>alert(1)</script>",
    "vbscript:msgbox(1)",
    "not-a-url",
    "",
    "//evil.com",
  ])("rejects %s", (url) => {
    expect(isSafeHttpUrl(url)).toBe(false);
  });
});
