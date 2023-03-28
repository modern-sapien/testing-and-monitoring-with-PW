// @ts-nocheck
import { test, expect } from "@playwright/test";

test("coupon", async ({ page }) => {
  await page.goto("https://danube-web.shop/");

  for (let i = 1; i <= process.env.PRODUCTS_NUMBER; i++) {
    await page.locator(`.preview:nth-child(${i}) > .preview-author`).click();
    await page.locator(".detail-wrapper > .call-to-action").click();
    await page.locator("#logo").click();
  }
  await page.locator("#cart").click();

  await page.waitForSelector("#total-price");
  const price: any = await page.locator("#total-price").innerText();

  await page.locator(".cart > label").click();
  await page.locator("#coupon").click();
  await page.locator("#coupon").type("COUPON2020");
  await page.locator(".cart > div > button").click();

  const expectedDiscountedPrice = (await price) * 0.8;

  const discountedPrice = await page.locator("#total-price").innerText();

  expect(parseFloat(discountedPrice)).toEqual(expectedDiscountedPrice);
});
