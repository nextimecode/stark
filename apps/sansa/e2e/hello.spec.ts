import { test, expect } from '@playwright/test'

test('has title Dashboard', async ({ page }) => {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3001'
  await page.goto(baseUrl)

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Dashboard/)
})
