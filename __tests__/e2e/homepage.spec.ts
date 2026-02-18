import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
    test('should display correctly', async ({ page }) => {
        await page.goto('/')

        // Check for main heading
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

        // Check for navigation
        await expect(page.getByRole('navigation')).toBeVisible()

        // Check for key navigation links
        await expect(page.getByRole('link', { name: /Meet Us/i })).toBeVisible()
        await expect(page.getByRole('link', { name: /Our Services/i })).toBeVisible()
        await expect(page.getByRole('link', { name: /Newsletters/i })).toBeVisible()
        await expect(page.getByRole('link', { name: /Contact Us/i })).toBeVisible()
    })

    test('should have working navigation links', async ({ page }) => {
        await page.goto('/')

        // Test Meet Us link
        await page
            .getByRole('link', { name: /Meet Us/i })
            .first()
            .click()
        await expect(page).toHaveURL(/\/meet-us/)

        // Navigate back to homepage
        await page.goto('/')

        // Test Our Services link
        await page
            .getByRole('link', { name: /Our Services/i })
            .first()
            .click()
        await expect(page).toHaveURL(/\/our-services/)

        // Navigate back to homepage
        await page.goto('/')

        // Test Newsletters link
        await page
            .getByRole('link', { name: /Newsletters/i })
            .first()
            .click()
        await expect(page).toHaveURL(/\/newsletters/)

        // Navigate back to homepage
        await page.goto('/')

        // Test Contact Us link
        await page
            .getByRole('link', { name: /Contact Us/i })
            .first()
            .click()
        await expect(page).toHaveURL(/\/contact-us/)
    })

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
