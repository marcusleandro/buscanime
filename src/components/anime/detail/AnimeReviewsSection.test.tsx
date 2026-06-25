import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { AnimeReviewsSection } from "./AnimeReviewsSection";

const mockUseAnimeReviewsPreview = vi.fn();

vi.mock("@/hooks/useAnimeReviews", () => ({
  useAnimeReviewsPreview: (...args: unknown[]) =>
    mockUseAnimeReviewsPreview(...args),
}));

describe("AnimeReviewsSection", () => {
  it("renders preview reviews and link when more pages exist", () => {
    mockUseAnimeReviewsPreview.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        isReviewBlocked: false,
        pageInfo: { hasNextPage: true },
        reviews: [
          {
            id: 1,
            mediaId: 20,
            userId: 1,
            createdAt: 1_700_000_000,
            updatedAt: 1_700_000_000,
            summary: "Review destaque",
            score: 88,
            ratingAmount: 10,
            user: { name: "Reviewer" },
          },
        ],
      },
    });

    render(
      <MemoryRouter>
        <AnimeReviewsSection animeId={20} />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: "Reviews" })
    ).toBeInTheDocument();
    expect(screen.getByText("Review destaque")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ver todos" })).toHaveAttribute(
      "href",
      "/animes/20/reviews"
    );
  });

  it("returns null when reviews are blocked", () => {
    mockUseAnimeReviewsPreview.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        isReviewBlocked: true,
        pageInfo: { hasNextPage: false },
        reviews: [],
      },
    });

    const { container } = render(<AnimeReviewsSection animeId={20} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("hides Ver todos when there is only one page", () => {
    mockUseAnimeReviewsPreview.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        isReviewBlocked: false,
        pageInfo: { hasNextPage: false },
        reviews: [
          {
            id: 1,
            mediaId: 20,
            userId: 1,
            createdAt: 1_700_000_000,
            updatedAt: 1_700_000_000,
            summary: "Único review",
            score: 70,
            ratingAmount: 2,
            user: { name: "Reviewer" },
          },
        ],
      },
    });

    render(<AnimeReviewsSection animeId={20} />);

    expect(
      screen.queryByRole("link", { name: "Ver todos" })
    ).not.toBeInTheDocument();
  });
});
