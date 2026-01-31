// End-to-end tests for the salary calculator UI.
import { expect, test } from "@playwright/test";

test("submits the salary form and shows net salary results", async ({ page }) => {
  // Use defaults and submit the form.
  await page.goto("/");

  await page.getByRole("button", { name: "Calculate net salary" }).click();

  // Confirm the result section appears.
  await expect(page.getByRole("heading", { name: "Estimated Net Salary" })).toBeVisible();
  await expect(page.getByText(/Income tax:/)).toBeVisible();
  await expect(page.getByText(/Church tax:/)).toBeVisible();
});

test("submits a customized salary form and renders a result breakdown", async ({
  page,
}) => {
  // Fill out a full custom scenario.
  await page.goto("/");

  await page.getByLabel("Gross amount").fill("6500");
  await page.getByLabel("Period").selectOption("yearly");
  await page.getByLabel("Tax class").selectOption("3");
  await page.getByLabel("Bundesland").selectOption("BY");
  await expect(page.getByText("Pension region: West (auto)")).toBeVisible();
  await page.getByLabel("Church tax applicable").check();
  await page.getByLabel("Children count").fill("2");
  await page.getByLabel("Annual allowance").fill("1200");
  await page.getByLabel("Health insurance type").selectOption("private");
  await page.getByLabel("Private insurance rate (%)").fill("12.4");
  await page.getByLabel("Calculation year").fill("2024");

  await page.getByRole("button", { name: "Calculate net salary" }).click();

  // Verify the breakdown is visible.
  await expect(page.getByRole("heading", { name: "Estimated Net Salary" })).toBeVisible();
  await expect(page.locator(".results-section .net")).toContainText("€");
  await expect(page.getByText(/Income tax:/)).toBeVisible();
  await expect(page.getByText(/Health insurance:/)).toBeVisible();
});
