// @ts-nocheck

import { test, expect } from "@playwright/test";

test("login flow", async ({ page }) => {
  await page.goto("https://danube-web.shop/");

  await page.locator("#login").click();

  await page.locator("#n-email").type(process.env.USER_EMAIL);
  await page.locator("#n-password2").type(process.env.USER_PASSWORD);

  await page.locator("#goto-signin-btn").click();

  const loginMessage = await page.locator("#login-message");
  await expect(loginMessage).toBeVisible();
});
