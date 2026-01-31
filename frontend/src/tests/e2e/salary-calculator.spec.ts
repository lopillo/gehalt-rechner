import { expect, test } from "@playwright/test";

test("submits the salary form and shows net salary results", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Calculate net salary" }).click();

  await expect(page.getByRole("heading", { name: "Estimated Net Salary" })).toBeVisible();
  await expect(page.getByText("€2,701.25")).toBeVisible();
  await expect(page.getByText("Income tax: €1,250.00")).toBeVisible();
  await expect(page.getByText("Church tax: €0.00")).toBeVisible();
});
