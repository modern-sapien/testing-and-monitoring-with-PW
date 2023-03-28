// @ts-ignore
import { test, expect } from "@playwright/test";

test("account settings", async ({ page }) => {
  await page.goto("https://danube-web.shop/");

  await page.locator("#login").click();

  // @ts-ignore USER_EMAIL is returning a string
  await page.locator("#n-email").type(process.env.USER_EMAIL);
  // @ts-ignore USER_PASSWORD is returning a string
  await page.locator("#n-password2").type(process.env.USER_PASSWORD);
  await page.locator("#goto-signin-btn").click();

  await page.locator(".fa-user").click();

  await page.waitForSelector("#user-details > div > input");

  await page.getByPlaceholder("Name", { exact: true }).click();
  await page.getByPlaceholder("Name", { exact: true }).fill("John");

  await page.getByRole("button", { name: "Update" }).click();
});
