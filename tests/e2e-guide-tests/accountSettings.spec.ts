// @ts-ignore
import { test, expect } from "@playwright/test";

test("account settings", async ({ page }) => {
  await page.goto("https://danube-web.shop/");

  await page.click("#login");
  await page.click("#n-email");
  // @ts-ignore USER_EMAIL is returning a string
  await page.type("#n-email", process.env.USER_EMAIL);
  // @ts-ignore USER_PASSWORD is returning a string
  await page.type("#n-password2", process.env.USER_PASSWORD);
  await page.click("#goto-signin-btn");

  await page.click(".fa-user");

  await page.waitForSelector("#user-details > div > input");

  await page.getByPlaceholder("Name", { exact: true }).click();
  await page.getByPlaceholder("Name", { exact: true }).fill("John");

  await page.getByRole("button", { name: "Update" }).click();
});
