import { test, expect } from '@playwright/test'

test.describe('Google Maps', () => {
    test('should display map on contact-us page', async ({ page }) => {
        await page.goto('/contact-us')

        // Wait for map container to be visible
        const mapContainer = page.getByTestId('google-map')
        await expect(mapContainer).toBeVisible({ timeout: 10000 })
    })

    test('should load Google Maps iframe', async ({ page }) => {
        await page.goto('/contact-us')

        // Wait a bit for map to load
        await page.waitForTimeout(2000)

        // Check if there's an iframe (Google Maps loads in an iframe)
        const iframes = page.locator('iframe')
        const iframeCount = await iframes.count()

        // Should have at least one iframe (Google Maps)
        expect(iframeCount).toBeGreaterThan(0)
    })

    test('should display contact information', async ({ page }) => {
        await page.goto('/contact-us')

        // Check for "Contact Us" or similar heading
        await expect(page.getByRole('heading', { name: /Contact/i })).toBeVisible()

        // Check that map container exists
        await expect(page.getByTestId('google-map')).toBeVisible()
    })

    test('should have proper map dimensions', async ({ page }) => {
        await page.goto('/contact-us')

        const mapContainer = page.getByTestId('google-map')
        await expect(mapContainer).toBeVisible({ timeout: 10000 })

        // Check that map has reasonable dimensions
        const box = await mapContainer.boundingBox()
        expect(box).toBeTruthy()
        if (box) {
            expect(box.width).toBeGreaterThan(200)
            expect(box.height).toBeGreaterThan(200)
        }
    })
})
