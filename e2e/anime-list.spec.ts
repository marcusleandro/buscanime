import { expect, test } from "@playwright/test";

test.describe("Anime list", () => {
  test("loads anime list on home page", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Buscanime" })
    ).toBeVisible();
    await expect(page.getByRole("searchbox")).toBeVisible();

    await expect(page.getByText("One Piece").first()).toBeVisible({
      timeout: 15_000,
    });
  });

  test("filters by search term", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("searchbox").fill("One Piece");
    await page.waitForURL(/search=One\+Piece|search=One%20Piece/);

    await expect(page.getByText("One Piece").first()).toBeVisible({
      timeout: 15_000,
    });
  });

  test("filters by movie format", async ({ page }) => {
    await page.goto("/?format=MOVIE");

    await expect(page).toHaveURL(/format=MOVIE/);
    await expect(
      page.getByText("Ver Mais").or(page.locator('[data-slot="card"]').first())
    ).toBeVisible({ timeout: 15_000 });
  });

  test("loads more animes", async ({ page }) => {
    await page.goto("/");

    const loadMore = page.getByRole("button", { name: "Ver Mais" });
    await expect(loadMore).toBeVisible({ timeout: 15_000 });

    const cardsBefore = await page.locator('[data-slot="card"]').count();
    await loadMore.click();
    await expect(page.locator('[data-slot="card"]')).toHaveCount(
      cardsBefore + 12,
      { timeout: 15_000 }
    );
  });
});
