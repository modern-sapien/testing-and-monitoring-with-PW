import { test, expect } from "@playwright/test";
const fs = require("fs");

test("file upload", async ({ page }) => {
  await page.goto("https://danube-web.shop/");

  await page.click("#login");

  await page.type("#n-email", process.env.USER_EMAIL);
  await page.type("#n-password2", process.env.USER_PASSWORD);
  await page.getByRole("button", { name: "Sign In" }).click();

  await page.locator("#account").click();

  await page.locator('input[type="file"]').setInputFiles(process.env.FILE_PATH);
  await page.getByRole("button", { name: "Upload" }).click();

  await page.getByText("Upload successful.");
});

test("file download", async ({ page }) => {
  await page.goto("https://danube-web.shop/");

  await page.click("#login");

  await page.type("#n-email", process.env.USER_EMAIL);
  await page.type("#n-password2", process.env.USER_PASSWORD);
  await page.click("#goto-signin-btn");

  await page.click("#account");

  await page.locator("#orders > ul > li:nth-child(1) > a");

  const downloadPromise = page.waitForEvent("download");

  await page.getByRole("link", { name: "Invoice" }).click();

  const download = await downloadPromise;

  console.log(await download.path());

  const newFilePath = await download.path();

  const testFile = await fs.promises.readFile(process.env.TEST_FILE_PATH); // Read the contents of the fixture file
  const newFile = await fs.promises.readFile(newFilePath);

  expect(testFile).toEqual(newFile);
});
