import { test, expect } from "@playwright/test";

test("signup flow", async ({ page }) => {
  await page.goto("https://danube-web.shop/");
  const bookList = [
    "The Foreigner",
    "The Transformation",
    "For Whom the Ball Tells",
    "Baiting for Robot",
  ];

  await page.locator(".topbar > input").click();
  await page.locator(".topbar > input").type("for");
  await page.locator("#button-search").click();

  await page.waitForSelector(".shop-content > ul > .preview:nth-child(1) > .preview-title");

  // Halt immediately if results do not equal expected number
  const resultsNumber = await page.locator(".preview-title").count();
  expect(resultsNumber).toEqual(bookList.length);

  // Remove every element found from the original array...
  for (let i = 0; i < resultsNumber; i++) {
    const resultTitle: any = await page
      .locator(`.preview:nth-child(${i + 1}) > .preview-title`)
      .innerText();

    const index = bookList.indexOf(resultTitle);
    bookList.splice(index, 1);
  }

  expect(bookList.length).toEqual(0);
});
