import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { AnimeEpisodesPreview } from "./AnimeEpisodesPreview";

describe("AnimeEpisodesPreview", () => {
  it("renders streaming episode previews with external links", () => {
    render(
      <MemoryRouter>
        <AnimeEpisodesPreview
          animeId={20}
          episodes={220}
          duration={24}
          streamingEpisodes={[
            {
              title: "Enter: Naruto Uzumaki!",
              site: "Crunchyroll",
              thumbnail: "https://example.com/thumb.jpg",
              url: "https://example.com/ep1",
            },
          ]}
        />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Episódios" })).toBeInTheDocument();
    expect(screen.getByText(/220 episódios/)).toBeInTheDocument();
    expect(screen.getByText("Enter: Naruto Uzumaki!")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ver todos" })).toHaveAttribute(
      "href",
      "/animes/20/episodes"
    );
  });

  it("renders numbered placeholders when streaming episodes are unavailable", () => {
    render(
      <MemoryRouter>
        <AnimeEpisodesPreview
          animeId={1}
          episodes={12}
          duration={24}
          streamingEpisodes={[]}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("Ep. 1")).toBeInTheDocument();
    expect(screen.getByText("Ep. 6")).toBeInTheDocument();
    expect(screen.queryByText("Ep. 7")).not.toBeInTheDocument();
  });

  it("returns null when there are no episodes", () => {
    const { container } = render(
      <MemoryRouter>
        <AnimeEpisodesPreview
          animeId={1}
          episodes={null}
          duration={null}
          streamingEpisodes={[]}
        />
      </MemoryRouter>
    );

    expect(container).toBeEmptyDOMElement();
  });
});
