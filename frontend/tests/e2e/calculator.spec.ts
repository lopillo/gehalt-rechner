import { test, expect } from "@playwright/test";

test.describe("Salary calculator flow", () => {
  test("submits form and shows net salary", async ({ page }) => {
    await page.goto("/");

    await page.getByLabel("Gross amount").fill("6000");
    await page.getByRole("button", { name: /calculate net salary/i }).click();

    await expect(page.getByText("Estimated Net Salary")).toBeVisible();
  });
});
