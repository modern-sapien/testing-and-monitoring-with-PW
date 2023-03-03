// @ts-ignore
import { test, expect } from "@playwright/test";

test('API - danube - active and up', async ({ request }) => {
  const response = await request.get(`https://danube-web.shop/api/books`, {
    headers: {
      Accept: 'application/json',
    }
  });
  expect(response.ok()).toBeTruthy();
  })


  test('API - danube - book length matches inventory', async ({ request } ) => {
    const response = await request.get(`https://danube-web.shop/api/books`, {
      headers: {
        Accept: 'application/json',
      }
    });

    const responseJSON = await response.json()

    expect(responseJSON.length).toEqual(30);
    })