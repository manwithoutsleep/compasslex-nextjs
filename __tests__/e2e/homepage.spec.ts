import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
    test('should have a footer', async ({ page }) => {
        await page.goto('/')

        // Check for footer (contentinfo landmark)
        await expect(page.getByRole('contentinfo')).toBeVisible()
    })

    test('should display page title correctly', async ({ page }) => {
        await page.goto('/')

        await expect(page).toHaveTitle(/Compass Christian Counseling/i)
    })
})
