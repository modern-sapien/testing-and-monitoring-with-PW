// @ts-ignore
import { test, expect } from "@playwright/test";

test("checkout", async ({ page }) => {
  const navigationPromise = page.waitForNavigation();

  await page.goto("https://danube-web.shop/");

  for (let i = 1; i <= process.env.PRODUCTS_NUMBER; i++) {
    await page.click(`.preview:nth-child(${i}) > .preview-author`);
    await page.click(".detail-wrapper > .call-to-action");
    await page.click("#logo");

    await navigationPromise;
  }

  await page.click("#cart");

  await page.click(".cart > .call-to-action");

  await page.click("#app-content #s-name");

  await page.type("#s-name", "Max");
  await page.type("#s-surname", "Mustermann");
  await page.type("#s-address", "Charlottenstr. 57");
  await page.type("#s-zipcode", "10117");
  await page.type("#s-city", "Berlin");
  await page.type("#s-company", "Firma GmbH");

  await page.click(".checkout > form");

  await page.click("#asap");

  await page.click(".checkout > .call-to-action");

  const orderConfirmation = await page.locator("#order-confirmation");
  await expect(orderConfirmation).toBeVisible();
});
