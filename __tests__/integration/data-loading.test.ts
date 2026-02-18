import { describe, it, expect } from 'vitest'
import { counselorRepository, newsletterRepository } from '@/services/data-repository'

/**
 * Integration tests for data loading functionality.
 * These tests verify that the repository layer correctly loads and parses
 * all data from JSON files, ensuring data integrity across the application.
 */
describe('Data Loading Integration', () => {
    describe('Counselor Data', () => {
        it('should load all 11 counselors successfully', async () => {
            const counselors = await counselorRepository.getAllCounselors()

            expect(counselors).toHaveLength(11)
        })

        it('should have all required fields for each counselor', async () => {
            const counselors = await counselorRepository.getAllCounselors()

            counselors.forEach((counselor) => {
                expect(counselor).toHaveProperty('id')
                expect(counselor).toHaveProperty('firstName')
                expect(counselor).toHaveProperty('lastName')
                expect(counselor).toHaveProperty('email')
                expect(counselor).toHaveProperty('title')
                expect(counselor).toHaveProperty('shortDescription')
                expect(counselor).toHaveProperty('longDescription')
                expect(counselor).toHaveProperty('slug')
                expect(counselor).toHaveProperty('credentials')
                expect(counselor).toHaveProperty('insurance')
                expect(counselor).toHaveProperty('memberships')
                expect(counselor).toHaveProperty('appointmentLink')
            })
        })

        it('should load counselors with valid data types', async () => {
            const counselors = await counselorRepository.getAllCounselors()
            const firstCounselor = counselors[0]

            expect(typeof firstCounselor.id).toBe('string')
            expect(typeof firstCounselor.firstName).toBe('string')
            expect(typeof firstCounselor.lastName).toBe('string')
            expect(typeof firstCounselor.email).toBe('string')
            expect(Array.isArray(firstCounselor.credentials)).toBe(true)
            expect(Array.isArray(firstCounselor.insurance)).toBe(true)
            expect(Array.isArray(firstCounselor.memberships)).toBe(true)
            expect(Array.isArray(firstCounselor.longDescription)).toBe(true)
        })

        it('should find counselor by slug', async () => {
            const counselor = await counselorRepository.getCounselorBySlug('joanna')

            expect(counselor).not.toBeNull()
            expect(counselor?.slug).toBe('joanna')
            expect(counselor?.firstName).toBe('Joanna')
        })

        it('should find counselor by name (case-insensitive)', async () => {
            const counselor = await counselorRepository.getCounselorByName('joanna')

            expect(counselor).not.toBeNull()
            expect(counselor?.firstName).toBe('Joanna')
        })
    })

    describe('Newsletter Data', () => {
        it('should load all 24 newsletters successfully', async () => {
            const newsletters = await newsletterRepository.getAllNewsletters()

            expect(newsletters).toHaveLength(24)
        })

        it('should have all required fields for each newsletter', async () => {
            const newsletters = await newsletterRepository.getAllNewsletters()

            newsletters.forEach((newsletter) => {
                expect(newsletter).toHaveProperty('id')
                expect(newsletter).toHaveProperty('title')
                expect(newsletter).toHaveProperty('year')
                expect(newsletter).toHaveProperty('quarter')
                expect(newsletter).toHaveProperty('description')
            })
        })

        it('should load newsletters with valid data types', async () => {
            const newsletters = await newsletterRepository.getAllNewsletters()
            const firstNewsletter = newsletters[0]

            expect(typeof firstNewsletter.id).toBe('string')
            expect(typeof firstNewsletter.title).toBe('string')
            expect(typeof firstNewsletter.year).toBe('string')
            expect(typeof firstNewsletter.quarter).toBe('string')
            // description can be null
            expect(
                firstNewsletter.description === null ||
                    typeof firstNewsletter.description === 'string'
            ).toBe(true)
        })

        it('should sort newsletters correctly by year and quarter (newest first)', async () => {
            const newsletters = await newsletterRepository.getAllNewslettersSorted()

            // Verify descending order
            for (let i = 0; i < newsletters.length - 1; i++) {
                const current = newsletters[i]
                const next = newsletters[i + 1]

                const currentYear = parseInt(current.year)
                const nextYear = parseInt(next.year)

                if (currentYear === nextYear) {
                    // Same year, quarter should be descending
                    const currentQuarter = parseInt(current.quarter)
                    const nextQuarter = parseInt(next.quarter)
                    expect(currentQuarter).toBeGreaterThanOrEqual(nextQuarter)
                } else {
                    // Different years, year should be descending
                    expect(currentYear).toBeGreaterThan(nextYear)
                }
            }
        })

        it('should find newsletter by id', async () => {
            const newsletters = await newsletterRepository.getAllNewsletters()
            const firstNewsletterId = newsletters[0].id

            const newsletter = await newsletterRepository.getNewsletterById(firstNewsletterId)

            expect(newsletter).not.toBeNull()
            expect(newsletter?.id).toBe(firstNewsletterId)
        })
    })

    describe('Data Consistency', () => {
        it('should have unique IDs for all counselors', async () => {
            const counselors = await counselorRepository.getAllCounselors()
            const ids = counselors.map((c) => c.id)
            const uniqueIds = new Set(ids)

            expect(uniqueIds.size).toBe(ids.length)
        })

        it('should have unique slugs for all counselors', async () => {
            const counselors = await counselorRepository.getAllCounselors()
            const slugs = counselors.map((c) => c.slug)
            const uniqueSlugs = new Set(slugs)

            expect(uniqueSlugs.size).toBe(slugs.length)
        })

        it('should have unique IDs for all newsletters', async () => {
            const newsletters = await newsletterRepository.getAllNewsletters()
            const ids = newsletters.map((n) => n.id)
            const uniqueIds = new Set(ids)

            expect(uniqueIds.size).toBe(ids.length)
        })

        it('should have valid email addresses for all counselors', async () => {
            const counselors = await counselorRepository.getAllCounselors()
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

            counselors.forEach((counselor) => {
                expect(emailRegex.test(counselor.email)).toBe(true)
            })
        })

        it('should have valid IDs that can be used to construct PDF URLs', async () => {
            const newsletters = await newsletterRepository.getAllNewsletters()

            newsletters.forEach((newsletter) => {
                // Newsletter IDs should be non-empty strings
                expect(newsletter.id).toBeTruthy()
                expect(typeof newsletter.id).toBe('string')

                // Construct PDF URL as done in the newsletter card component
                const fileBase = newsletter.id.replace(/^newsletter-/, '')
                const pdfUrl = `/assets/newsletters/${fileBase}.pdf`

                // Verify the constructed URL is valid
                expect(pdfUrl).toMatch(/\.pdf$/)
                expect(pdfUrl).toMatch(/^\/assets\/newsletters\//)
            })
        })
    })
})
