import { test, expect } from "@playwright/test";
import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

export const getToken = async (): Promise<string> => {
  const app = initializeApp({
    credential: cert(JSON.parse(process.env.GOOGLE_CREDENTIAL as string)),
  });
  const auth = getAuth(app);
  const customToken = await auth.createCustomToken(
    process.env.FIREBASE_TEST_UID as string
  );
  return customToken;
};

test("未ログイン時のテスト", async ({ page }) => {
  const goto = (path: string) => {
    return page.goto(`http://web-front:3000/${path}`);
  };
  await goto("");
  await page.waitForSelector("#login", { timeout: 10000 });
  const state = await page.$eval("#login", (e) => e.textContent);
  expect(state).toMatch(/ログイン/);
});

test("ログイン後のテスト", async ({ page }) => {
  const customToken = await getToken();
  const goto = (path: string) => {
    return page.goto(
      `http://web-front:3000/${path}?customToken=${customToken}`
    );
  };
  await goto("");
  await page.waitForSelector("#logout", { timeout: 10000 });
  const state = await page.$eval("#logout", (e) => e.textContent);
  expect(state).toMatch(/ログアウト/);
});
