import DOMPurify from "dompurify";

const ALLOWED_TAGS = [
  "p",
  "br",
  "b",
  "i",
  "em",
  "strong",
  "a",
  "ul",
  "ol",
  "li",
  "span",
  "blockquote",
];

const ALLOWED_ATTR = ["href", "target", "rel"];

/** Strips XSS vectors from AniList HTML (descriptions, review bodies) before DOM injection. */
export function sanitizeAnilistHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false,
    ALLOWED_URI_REGEXP: /^https?:\/\//i,
  });
}
