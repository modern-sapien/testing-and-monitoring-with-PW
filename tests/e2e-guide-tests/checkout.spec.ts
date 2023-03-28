// @ts-nocheck
import { test, expect } from "@playwright/test";

test("checkout", async ({ page }) => {
  const navigationPromise = page.waitForNavigation();

  await page.goto("https://danube-web.shop/");

  for (let i = 1; i <= process.env.PRODUCTS_NUMBER; i++) {
    await page.locator(`.preview:nth-child(${i}) > .preview-author`).click();
    await page.locator(".detail-wrapper > .call-to-action").click();
    await page.locator("#logo").click();

    await navigationPromise;
  }

  await page.locator("#cart").click();

  await page.locator(".cart > .call-to-action").click();

  await page.locator("#app-content #s-name").click();

  await page.locator("#s-name").type("Max");
  await page.locator("#s-surname").type("Mustermann");
  await page.locator("#s-address").type("Charlottenstr. 57");
  await page.locator("#s-zipcode").type("10117");
  await page.locator("#s-city").type("Berlin");
  await page.locator("#s-company").type("Firma GmbH");

  await page.locator(".checkout > form").click();

  await page.locator("#asap").click();

  await page.locator(".checkout > .call-to-action").click();

  const orderConfirmation = await page.locator("#order-confirmation");
  await expect(orderConfirmation).toBeVisible();
});
