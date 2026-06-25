import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ReviewCard } from "./ReviewCard";
import type { AnimeReview } from "@/services/anime";

const baseReview: AnimeReview = {
  id: 1,
  createdAt: 1_700_000_000,
  summary: "Uma jornada ninja memorável",
  body: "<p>Texto completo do review.</p>",
  score: 92,
  rating: 140,
  ratingAmount: 140,
  siteUrl: "https://anilist.co/review/1",
  user: {
    name: "NarutoFan",
    avatar: { large: "https://example.com/avatar.jpg" },
  },
};

describe("ReviewCard", () => {
  it("renders summary, score badge and external link", () => {
    render(<ReviewCard review={baseReview} variant="compact" />);

    expect(screen.getByText("NarutoFan")).toBeInTheDocument();
    expect(screen.getByText("Uma jornada ninja memorável")).toBeInTheDocument();
    expect(screen.getByText("92%")).toBeInTheDocument();
    expect(screen.getByText("140 pessoas acharam útil")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Ver no AniList/i })).toHaveAttribute(
      "href",
      "https://anilist.co/review/1"
    );
  });

  it("renders full body in full variant", () => {
    render(<ReviewCard review={baseReview} variant="full" />);

    expect(screen.getByText("Texto completo do review.")).toBeInTheDocument();
  });
});
