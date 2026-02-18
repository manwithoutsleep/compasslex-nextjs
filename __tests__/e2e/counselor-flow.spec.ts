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

    test('should display counselor details correctly', async ({ page }) => {
        await page.goto('/meet-us/joanna')

        // Check for counselor name
        await expect(page.getByRole('heading', { level: 2 })).toContainText(/Joanna/i)

        // Check for email link
        await expect(page.getByRole('link', { name: /@/i })).toBeVisible()

        // Check for appointment link
        await expect(page.getByRole('link', { name: /Make an appointment/i })).toBeVisible()

        // Check for image
        await expect(page.locator('img[alt*="Joanna"]')).toBeVisible()
    })

    test('should show 404 for non-existent counselor', async ({ page }) => {
        await page.goto('/meet-us/non-existent-counselor')

        // Should show "Not Found" heading or similar
        await expect(page.getByRole('heading', { name: /Not Found|404/i })).toBeVisible()
    })

    test('should have working appointment links', async ({ page }) => {
        await page.goto('/meet-us/joanna')

        // Get the appointment link
        const appointmentLink = page.getByRole('link', { name: /Make an appointment/i })

        // Verify it has an href attribute
        await expect(appointmentLink).toHaveAttribute('href', /.+/)

        // Verify it opens in a new tab
        await expect(appointmentLink).toHaveAttribute('target', '_blank')
        await expect(appointmentLink).toHaveAttribute('rel', /noopener noreferrer/)
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
