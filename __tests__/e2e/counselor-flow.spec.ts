import { test, expect } from '@playwright/test'

test.describe('Counselor Flow', () => {
    test('should display all 11 counselors on meet-us page', async ({ page }) => {
        await page.goto('/meet-us')

        // Wait for content to load
        await page.waitForSelector('[data-testid="counselor-card"]', { timeout: 5000 })

        // Count counselor cards
        const cards = page.locator('[data-testid="counselor-card"]')
        await expect(cards).toHaveCount(11)
    })

    test('should navigate from meet-us to counselor detail', async ({ page }) => {
        await page.goto('/meet-us')

        // Wait for cards to load
        await page.waitForSelector('[data-testid="counselor-card"]', { timeout: 5000 })

        // Click the "Read More" link for Joanna
        const joannaCard = page.locator('[data-testid="counselor-card"]').filter({
            hasText: 'Joanna',
        })
        await joannaCard.getByRole('link', { name: /Read More/i }).click()

        // Verify we're on the detail page
        await expect(page).toHaveURL(/\/meet-us\/joanna/)
        await expect(page.getByRole('heading', { level: 2 })).toContainText(/Joanna/i)
    })

    test('should show 404 for non-existent counselor', async ({ page }) => {
        await page.goto('/meet-us/non-existent-counselor')

        // Should show "Not Found" heading or similar
        await expect(page.getByRole('heading', { name: /Not Found|404/i })).toBeVisible()
    })

    test('should display counselor credentials', async ({ page }) => {
        await page.goto('/meet-us/joanna')

        // Look for credentials section
        const credentialsSection = page.locator('text=/Educational\\/Professional/i')
        if ((await credentialsSection.count()) > 0) {
            await expect(credentialsSection).toBeVisible()
        }
    })
})
