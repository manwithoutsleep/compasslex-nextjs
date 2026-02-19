import { test, expect } from '@playwright/test'

test.describe('Google Maps', () => {
    test('should display map on contact-us page', async ({ page }) => {
        await page.goto('/contact-us')

        // Wait for map container to be visible (check the contact page map specifically)
        const mapContainer = page.getByTestId('google-map-contact')
        await expect(mapContainer).toBeVisible({ timeout: 10000 })
    })

    test('should display contact information', async ({ page }) => {
        await page.goto('/contact-us')

        // Check for "Contact Us" or similar heading
        await expect(page.getByRole('heading', { name: /Contact/i })).toBeVisible()

        // Check that map container exists (check the contact page map specifically)
        await expect(page.getByTestId('google-map-contact')).toBeVisible()
    })

    test('should have proper map dimensions', async ({ page }) => {
        await page.goto('/contact-us')

        const mapContainer = page.getByTestId('google-map-contact')
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
