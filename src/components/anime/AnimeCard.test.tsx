import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import type { AnimeMedia } from "@/services/anime";
import { AnimeCard } from "./AnimeCard";

const mockAnime: AnimeMedia = {
  id: 1,
  title: { romaji: "One Piece" },
  coverImage: { extraLarge: "https://example.com/cover.jpg" },
  format: "TV",
  averageScore: 85,
  genres: ["Action", "Adventure"],
};

const renderCard = (anime: AnimeMedia = mockAnime) =>
  render(
    <MemoryRouter>
      <AnimeCard anime={anime} />
    </MemoryRouter>
  );

describe("AnimeCard", () => {
  it("renders title, score and genre chips", () => {
    renderCard();

    expect(screen.getByText("One Piece")).toBeInTheDocument();
    expect(screen.getByText("85%")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Adventure")).toBeInTheDocument();
  });

  it("renders N/A when score is null", () => {
    renderCard({ ...mockAnime, averageScore: null, format: null });

    expect(screen.getByText("N/A")).toBeInTheDocument();
  });

  it("links to the anime detail page", () => {
    renderCard();

    expect(
      screen.getByRole("link", { name: "Ver detalhes de One Piece" })
    ).toHaveAttribute("href", "/animes/1");
  });
});
