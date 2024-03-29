// @ts-nocheck
import { test, expect } from "@playwright/test";
import fs from "fs";
import axios from "axios";

test.beforeEach(async ({ page }) => {
  await page.goto("https://danube-web.shop/");

  await page.locator("#login").click();
  await page.locator("#n-email").type(process.env.USER_EMAIL);
  await page.locator("#n-password2").type(process.env.USER_PASSWORD);
  await page.getByRole("button", { name: "Sign In" }).click();

  await page.locator("#account").click();
});

test("file upload", async ({ page }) => {
  test.skip(process.env.CHECKLY_DONT === "skip");
  await page.locator('input[type="file"]').setInputFiles(process.env.FILE_PATH);

  await page.getByRole("button", { name: "Upload" }).click();

  await expect(page.locator("#upload-message-succcess")).toHaveText("Upload successful.");
});

test("file download", async ({ page }) => {
  test.skip(process.env.CHECKLY_DONT === "skip");

  const url = await page.locator("#orders > ul > li > a").getAttribute("href");
  const filePath = "./tests/fixtures/downloadedFile.pdf";

  const response = await axios.get("https://danube-web.shop" + url);
  const downloadedFile = Buffer.from(response.data);

  const testFile = await fs.readFileSync(filePath);

  expect(downloadedFile.equals(testFile));
});

test("file download alt", async ({ page }) => {
  test.skip(process.env.CHECKLY_DONT === "skip");
  const downloadPromise = page.waitForEvent("download");

  await page.getByRole("link", { name: "Invoice" }).click();

  const download = await downloadPromise;

  const downloadFilePath = await download.path();
  const testFile = await fs.promises.readFile(process.env.TEST_FILE_PATH);
  const downloadedFile = await fs.promises.readFile(downloadFilePath);

  expect(testFile).toEqual(downloadedFile);
});
