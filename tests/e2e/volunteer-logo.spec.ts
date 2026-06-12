import { test, expect } from "@playwright/test";

test("volunteer portal login page has large WFM logo", async ({ page }) => {
  await page.goto("/v/login");
  const logo = page.locator('img[alt="World Food Movement"]');
  await expect(logo).toBeVisible();
  const box = await logo.boundingBox();
  expect(box).not.toBeNull();
  console.log(`Logo size: ${box!.width}x${box!.height}px`);
  expect(box!.width).toBeGreaterThanOrEqual(200);
  expect(box!.height).toBeGreaterThanOrEqual(60);
  await page.screenshot({ path: "tests/e2e/screenshots/volunteer-login.png", fullPage: false });
});
