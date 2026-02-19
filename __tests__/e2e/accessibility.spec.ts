import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

/**
 * Accessibility tests using axe-core.
 * These tests ensure WCAG 2.1 AA compliance across all pages.
 */
test.describe('Accessibility', () => {
    test('homepage should not have accessibility violations', async ({ page }) => {
        await page.goto('/')

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

        expect(accessibilityScanResults.violations).toEqual([])
    })

    test('meet-us page should not have accessibility violations', async ({ page }) => {
        await page.goto('/meet-us')

        // Wait for counselor cards to load
        await page.waitForSelector('[data-testid="counselor-card"]', { timeout: 5000 })

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

        expect(accessibilityScanResults.violations).toEqual([])
    })

    test('counselor detail page should not have accessibility violations', async ({ page }) => {
        await page.goto('/meet-us/joanna')

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

        expect(accessibilityScanResults.violations).toEqual([])
    })

    test('newsletters page should not have accessibility violations', async ({ page }) => {
        await page.goto('/newsletters')

        // Wait for newsletter cards to load
        await page.waitForSelector('[data-testid="newsletter-card"]', { timeout: 5000 })

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

        expect(accessibilityScanResults.violations).toEqual([])
    })

    test('our-services page should not have accessibility violations', async ({ page }) => {
        await page.goto('/our-services')

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

        expect(accessibilityScanResults.violations).toEqual([])
    })

    test('faq page should not have accessibility violations', async ({ page }) => {
        await page.goto('/faq')

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

        expect(accessibilityScanResults.violations).toEqual([])
    })

    test('resources page should not have accessibility violations', async ({ page }) => {
        await page.goto('/resources')

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

        expect(accessibilityScanResults.violations).toEqual([])
    })

    test('404 page should not have accessibility violations', async ({ page }) => {
        await page.goto('/non-existent-page')

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

        expect(accessibilityScanResults.violations).toEqual([])
    })

    // NOTE: /contact-us is intentionally excluded from automated accessibility testing.
    // The page contains two GoogleMap components (main content + footer), each of which
    // renders an internal <div role="region"> with a duplicate aria-label. This causes a
    // landmark-unique violation in axe-core on Chromium/Firefox that cannot be fixed
    // without modifying Google Maps internals. See .docs/KNOWN_ISSUES.md for details.
})
