  // @ts-nocheck
import { test, expect } from "@playwright/test";

test("iframe", async ({ page }) => {
  await page.goto("https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe");

  // initial frame
  await page
    .frameLocator('iframe[title="MDN Web Docs Interactive Example"]')
    .getByRole("button", { name: "Reset" })
    .click();

  await page.reload();

  //inline frame 
  await page
    .frame({
      url: "https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik",
    })
    .getByRole("button", { name: "Zoom out" })
    .click();
});
