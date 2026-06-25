import { expect, test } from "@playwright/test";

const ANIME_LIST_PATH = "/animes";

test.describe("Anime list", () => {
  test("loads anime list page", async ({ page }) => {
    await page.goto(ANIME_LIST_PATH);

    await expect(page.getByRole("link", { name: /buscanime/i })).toBeVisible();
    await expect(
      page.getByRole("searchbox", { name: "Buscar anime" })
    ).toBeVisible();

    await expect(page.getByText("One Piece").first()).toBeVisible({
      timeout: 15_000,
    });
  });

  test("filters by search term", async ({ page }) => {
    await page.goto(ANIME_LIST_PATH);

    await page
      .getByRole("searchbox", { name: "Buscar anime" })
      .fill("One Piece");
    await page.waitForURL(/search=One\+Piece|search=One%20Piece/);

    await expect(page.getByText("One Piece").first()).toBeVisible({
      timeout: 15_000,
    });
  });

  test("filters by movie format", async ({ page }) => {
    await page.goto(`${ANIME_LIST_PATH}?format=MOVIE`);

    await expect(page).toHaveURL(/format=MOVIE/);
    await expect(
      page
        .getByRole("button", { name: /ver mais/i })
        .or(page.locator('[data-slot="card"]').first())
    ).toBeVisible({ timeout: 15_000 });
  });

  test("loads more animes", async ({ page }) => {
    await page.goto(ANIME_LIST_PATH);

    const loadMore = page.getByRole("button", { name: /ver mais/i });
    await expect(loadMore).toBeVisible({ timeout: 15_000 });

    const cardsBefore = await page.locator('[data-slot="card"]').count();
    await loadMore.click();
    await expect(page.locator('[data-slot="card"]')).toHaveCount(
      cardsBefore + 12,
      { timeout: 15_000 }
    );
  });

  test("navigates to anime detail page from card", async ({ page }) => {
    await page.goto(ANIME_LIST_PATH);

    const firstCard = page.locator('[data-slot="card"]').first();
    await expect(firstCard).toBeVisible({ timeout: 15_000 });

    const cardTitle = await firstCard
      .locator("[data-slot='card-title']")
      .first()
      .textContent();
    await firstCard.click();

    await expect(page).toHaveURL(/\/animes\/\d+/);
    if (cardTitle) {
      await expect(page.getByRole("heading", { level: 1 })).toContainText(
        cardTitle.trim(),
        { timeout: 15_000 }
      );
    }
    await expect(
      page.getByRole("link", { name: /voltar para lista/i })
    ).toBeVisible();
  });
});
