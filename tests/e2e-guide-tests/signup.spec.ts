// @ts-nocheck
import { test, expect } from "@playwright/test";

test("signup flow", async ({ page }) => {
  await page.goto("https://danube-web.shop/");

  await page.locator("#signup").click();
  await page.locator("#s-name").click();

  await page.locator("#s-name").type("John");
  await page.locator("#s-surname").type("Doe");
  await page.locator("#s-email").type(process.env.USER_EMAIL);
  await page.locator("#s-password2").type(process.env.USER_PASSWORD);
  await page.locator("#s-company").type("John Doe Inc.");

  await page.locator("#business").click();
  await page.locator("#marketing-agreement").click();
  await page.locator("#privacy-policy").click();
  await page.locator("#register-btn").click();

  const loginMessage = await page.locator("#login-message");
  await expect(loginMessage).toBeVisible();
});
