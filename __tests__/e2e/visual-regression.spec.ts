import { test, expect } from '@playwright/test'

/**
 * Visual regression tests to catch unintended visual changes.
 * These tests take screenshots and compare them against baseline images.
 *
 * To update baselines: npx playwright test visual-regression.spec.ts --update-snapshots
 */
test.describe('Visual Regression', () => {
    test('homepage visual regression', async ({ page }) => {
        await page.goto('/')

        // Wait for content to load
        await page.waitForLoadState('networkidle')

        // Take full page screenshot
        await expect(page).toHaveScreenshot('homepage.png', {
            fullPage: true,
            animations: 'disabled',
        })
    })

    test('meet-us page visual regression', async ({ page }) => {
        await page.goto('/meet-us')

        // Wait for counselor cards to load
        await page.waitForSelector('[data-testid="counselor-card"]', { timeout: 5000 })
        await page.waitForLoadState('networkidle')

        await expect(page).toHaveScreenshot('meet-us.png', {
            fullPage: true,
            animations: 'disabled',
        })
    })

    test('counselor detail visual regression', async ({ page }) => {
        await page.goto('/meet-us/joanna')

        // Wait for content to load
        await page.waitForLoadState('networkidle')

        await expect(page).toHaveScreenshot('counselor-detail-joanna.png', {
            fullPage: true,
            animations: 'disabled',
        })
    })

    test('newsletters page visual regression', async ({ page }) => {
        await page.goto('/newsletters')

        // Wait for newsletter cards to load
        await page.waitForSelector('[data-testid="newsletter-card"]', { timeout: 5000 })
        await page.waitForLoadState('networkidle')

        await expect(page).toHaveScreenshot('newsletters.png', {
            fullPage: true,
            animations: 'disabled',
        })
    })

    test('contact-us page visual regression', async ({ page }) => {
        await page.goto('/contact-us')

        // Wait for map to load
        await page.waitForTimeout(2000)
        await page.waitForLoadState('networkidle')

        await expect(page).toHaveScreenshot('contact-us.png', {
            fullPage: true,
            animations: 'disabled',
        })
    })

    test('our-services page visual regression', async ({ page }) => {
        await page.goto('/our-services')

        await page.waitForLoadState('networkidle')

        await expect(page).toHaveScreenshot('our-services.png', {
            fullPage: true,
            animations: 'disabled',
        })
    })

    test('faq page visual regression', async ({ page }) => {
        await page.goto('/faq')

        await page.waitForLoadState('networkidle')

        await expect(page).toHaveScreenshot('faq.png', {
            fullPage: true,
            animations: 'disabled',
        })
    })

    test('resources page visual regression', async ({ page }) => {
        await page.goto('/resources')

        await page.waitForLoadState('networkidle')

        await expect(page).toHaveScreenshot('resources.png', {
            fullPage: true,
            animations: 'disabled',
        })
    })
})
