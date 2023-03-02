// @ts-ignore
import { test, expect } from "@playwright/test";

test('API - danube is active and up', async ({ request }) => {
  const response = await request.get(`https://danube-web.shop/api/books`, {
    headers: {
      Accept: 'application/json',
    }
  });
  expect(response.ok()).toBeTruthy();
  })


  test('API - danube book list length matches inventory', async ({ request } ) => {
    const response = await request.get(`https://danube-web.shop/api/books`, {
      headers: {
        Accept: 'application/json',
      }
    });

    await response.json()

    const responseJSON = await response.json()

    expect(responseJSON.length).toEqual(30);
    })