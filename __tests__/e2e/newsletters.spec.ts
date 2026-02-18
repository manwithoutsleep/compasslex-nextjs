import { test, expect } from '@playwright/test'

test.describe('Newsletters', () => {
    test('should display all 24 newsletters', async ({ page }) => {
        await page.goto('/newsletters')

        // Wait for newsletter cards to load
        await page.waitForSelector('[data-testid="newsletter-card"]', { timeout: 5000 })

        // Count newsletter cards
        const cards = page.locator('[data-testid="newsletter-card"]')
        await expect(cards).toHaveCount(24)
    })

    test('should have working PDF download links', async ({ page }) => {
        await page.goto('/newsletters')

        // Wait for cards to load
        await page.waitForSelector('[data-testid="newsletter-card"]', { timeout: 5000 })

        // Get first PDF link
        const pdfLink = page.getByRole('link', { name: /download/i }).first()

        // Verify it has href attribute ending with .pdf
        const href = await pdfLink.getAttribute('href')
        expect(href).toMatch(/\.pdf$/)

        // Verify it opens in new tab
        await expect(pdfLink).toHaveAttribute('target', '_blank')
    })

    test('should display newsletter titles', async ({ page }) => {
        await page.goto('/newsletters')

        // Wait for cards to load
        await page.waitForSelector('[data-testid="newsletter-card"]', { timeout: 5000 })

        // Check that the first newsletter card has a title
        const firstCard = page.locator('[data-testid="newsletter-card"]').first()
        await expect(firstCard.locator('h3, h4, h5, h6')).toBeVisible()
    })

    test('should display page heading', async ({ page }) => {
        await page.goto('/newsletters')

        // Check for "Compass Articles" heading
        await expect(page.getByRole('heading', { name: /Compass Articles/i })).toBeVisible()
    })

    test('should have readable newsletter layout', async ({ page }) => {
        await page.goto('/newsletters')

        // Wait for content
        await page.waitForSelector('[data-testid="newsletter-card"]', { timeout: 5000 })

        // Check that cards are visible and properly laid out
        const cards = page.locator('[data-testid="newsletter-card"]')
        const firstCard = cards.first()

        // Card should be visible
        await expect(firstCard).toBeVisible()

        // Card should have reasonable dimensions
        const box = await firstCard.boundingBox()
        expect(box).toBeTruthy()
        if (box) {
            expect(box.width).toBeGreaterThan(100)
            expect(box.height).toBeGreaterThan(50)
        }
    })
})
