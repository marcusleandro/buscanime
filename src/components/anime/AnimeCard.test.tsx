import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { AnimeMedia } from "@/services/AnimeService";
import { AnimeCard } from "./AnimeCard";

const mockAnime: AnimeMedia = {
  id: 1,
  title: { romaji: "One Piece" },
  coverImage: { extraLarge: "https://example.com/cover.jpg" },
  format: "TV",
  averageScore: 85,
  genres: ["Action", "Adventure"],
};

describe("AnimeCard", () => {
  it("renders title, score and genre chips", () => {
    render(<AnimeCard anime={mockAnime} />);

    expect(screen.getByText("One Piece")).toBeInTheDocument();
    expect(screen.getByText("85%")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Adventure")).toBeInTheDocument();
  });

  it("renders N/A when score is null", () => {
    render(
      <AnimeCard anime={{ ...mockAnime, averageScore: null, format: null }} />
    );

    expect(screen.getByText("N/A")).toBeInTheDocument();
  });
});
