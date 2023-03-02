// @ts-ignore
import { test, expect } from "@playwright/test";


test('API - ', async ({ request }) => {
  const response = await request.get(`https://danube-web.shop/api/books`, {
    headers: {
      Accept: 'application/json',
    }
  });
  expect(response.ok()).toBeTruthy();
  })
