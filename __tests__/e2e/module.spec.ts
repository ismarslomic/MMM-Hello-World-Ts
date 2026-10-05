import { expect, test, type Page } from '@playwright/test'

test.describe('MMM-Hello-World-Ts', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  async function assertIndependentGreetings(page: Page) {
    const greetings = page.locator('.MMM-Hello-World-Ts .green')
    await expect(greetings).toHaveCount(2)
    await expect(greetings.nth(0)).toHaveText('MMM-Hello-World-Ts says: Hello world Ismar!')
    await expect(greetings.nth(0)).toBeVisible()
    await expect(greetings.nth(1)).toHaveText('MMM-Hello-World-Ts says: Hello second instance!')
    await expect(greetings.nth(1)).toBeVisible()
  }

  test('renders separate greetings for two configured instances', async ({ page }) => {
    await assertIndependentGreetings(page)
    const modules = page.locator('.MMM-Hello-World-Ts')
    await expect(modules.nth(0)).not.toContainText('Invalid Date')
    await expect(modules.nth(1)).not.toContainText('Invalid Date')
  })

  test('keeps instance data independent after a polling update', async ({ page }) => {
    await assertIndependentGreetings(page)
    const timestamp = page.locator('.MMM-Hello-World-Ts .teal').first()
    const initialTimestamp = await timestamp.textContent()
    if (initialTimestamp === null) {
      throw new Error('The module timestamp must contain text before polling')
    }
    // Retry until the next 10-second polling cycle updates the displayed timestamp.
    await expect(timestamp).not.toHaveText(initialTimestamp, { timeout: 15000 })
    await assertIndependentGreetings(page)
  })
})
