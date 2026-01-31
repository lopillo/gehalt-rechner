import { expect, test } from "@playwright/test";

test("submits the salary form and shows net salary results", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Calculate net salary" }).click();

  await expect(page.getByRole("heading", { name: "Estimated Net Salary" })).toBeVisible();
  await expect(page.getByText("€2,701.25")).toBeVisible();
  await expect(page.getByText("Income tax: €1,250.00")).toBeVisible();
  await expect(page.getByText("Church tax: €0.00")).toBeVisible();
});

test("submits a customized salary form and renders a result breakdown", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByLabel("Gross amount").fill("6500");
  await page.getByLabel("Period").selectOption("yearly");
  await page.getByLabel("Tax class").selectOption("3");
  await page.getByLabel("Bundesland").selectOption("BY");
  await page.getByLabel("Church tax applicable").check();
  await page.getByLabel("Children count").fill("2");
  await page.getByLabel("Annual allowance").fill("1200");
  await page.getByLabel("Health insurance type").selectOption("private");
  await page.getByLabel("Private insurance rate (%)").fill("12.4");
  await page.getByLabel("Pension region").selectOption("East");
  await page.getByLabel("Calculation year").fill("2024");

  await page.getByRole("button", { name: "Calculate net salary" }).click();

  await expect(page.getByRole("heading", { name: "Estimated Net Salary" })).toBeVisible();
  await expect(page.locator(".results-section .net")).toContainText("€");
  await expect(page.getByText(/Income tax:/)).toBeVisible();
  await expect(page.getByText(/Health insurance:/)).toBeVisible();
});
