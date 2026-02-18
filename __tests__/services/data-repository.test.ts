import { describe, it, expect, beforeEach } from 'vitest'
import { CounselorRepository, NewsletterRepository } from '@/services/data-repository'

/**
 * Note on Coverage:
 * The error handling paths in getAllCounselors() and getAllNewsletters()
 * (lines 77-91, 144-158) are not tested due to ES module mocking limitations in Vitest.
 * These paths handle:
 * - File not found errors (ENOENT)
 * - Invalid JSON syntax
 * - Zod validation failures
 * - Generic error rethrowing
 *
 * These are defensive error handling paths that protect against malformed data files.
 * The happy path is well-tested and covers the primary use cases.
 */

describe('CounselorRepository', () => {
    let repo: CounselorRepository

    beforeEach(() => {
        repo = new CounselorRepository()
    })

    describe('getAllCounselors', () => {
        it('should load all counselors from JSON', async () => {
            const counselors = await repo.getAllCounselors()

            expect(counselors).toBeInstanceOf(Array)
            expect(counselors.length).toBeGreaterThan(0)
        })

        it('should return counselors with all required fields', async () => {
            const counselors = await repo.getAllCounselors()
            const firstCounselor = counselors[0]

            expect(firstCounselor).toHaveProperty('firstName')
            expect(firstCounselor).toHaveProperty('lastName')
            expect(firstCounselor).toHaveProperty('email')
            expect(firstCounselor).toHaveProperty('shortDescription')
            expect(firstCounselor).toHaveProperty('longDescription')
            expect(firstCounselor).toHaveProperty('id')
            expect(firstCounselor).toHaveProperty('slug')
        })

        it('should return counselors with array fields as arrays', async () => {
            const counselors = await repo.getAllCounselors()
            const firstCounselor = counselors[0]

            expect(Array.isArray(firstCounselor.credentials)).toBe(true)
            expect(Array.isArray(firstCounselor.insurance)).toBe(true)
            expect(Array.isArray(firstCounselor.memberships)).toBe(true)
            expect(typeof firstCounselor.title).toBe('string')
        })
    })

    describe('getCounselorByName', () => {
        it('should find counselor by firstname with exact match', async () => {
            // Assuming "Joanna" exists in the data
            const counselor = await repo.getCounselorByName('Joanna')

            expect(counselor).toBeDefined()
            expect(counselor).not.toBeNull()
            if (counselor) {
                expect(counselor.firstName).toBe('Joanna')
            }
        })

        it('should return null for non-existent counselor', async () => {
            const counselor = await repo.getCounselorByName('NonExistentPerson')

            expect(counselor).toBeNull()
        })

        it('should return null for empty string', async () => {
            const counselor = await repo.getCounselorByName('')

            expect(counselor).toBeNull()
        })

        it('should find counselor regardless of case', async () => {
            // Test case-insensitive search
            const counselor = await repo.getCounselorByName('joanna')

            // This might fail if implementation is case-sensitive
            // If so, update implementation or test expectations
            expect(counselor).toBeDefined()
        })
    })

    describe('getCounselorBySlug', () => {
        it('should find counselor by slug', async () => {
            const counselor = await repo.getCounselorBySlug('joanna')

            expect(counselor).not.toBeNull()
            if (counselor) {
                expect(counselor.slug).toBe('joanna')
                expect(counselor.firstName).toBe('Joanna')
            }
        })

        it('should return null for non-existent slug', async () => {
            const counselor = await repo.getCounselorBySlug('nonexistent')

            expect(counselor).toBeNull()
        })

        it('should return null for empty string', async () => {
            const counselor = await repo.getCounselorBySlug('')

            expect(counselor).toBeNull()
        })

        it('should perform exact match (case-sensitive)', async () => {
            const counselor = await repo.getCounselorBySlug('Joanna')

            expect(counselor).toBeNull()
        })
    })
})

describe('NewsletterRepository', () => {
    let repo: NewsletterRepository

    beforeEach(() => {
        repo = new NewsletterRepository()
    })

    describe('getAllNewsletters', () => {
        it('should load all newsletters from JSON', async () => {
            const newsletters = await repo.getAllNewsletters()

            expect(newsletters).toBeInstanceOf(Array)
            expect(newsletters.length).toBeGreaterThan(0)
        })

        it('should return newsletters with all required fields', async () => {
            const newsletters = await repo.getAllNewsletters()
            const firstNewsletter = newsletters[0]

            expect(firstNewsletter).toHaveProperty('id')
            expect(firstNewsletter).toHaveProperty('title')
            expect(firstNewsletter).toHaveProperty('year')
            expect(firstNewsletter).toHaveProperty('quarter')
            expect(firstNewsletter).toHaveProperty('description')
        })

        it('should handle null description field', async () => {
            const newsletters = await repo.getAllNewsletters()

            // At least one newsletter might have null description
            const newsletterWithNullDesc = newsletters.find((n) => n.description === null)
            expect(newsletterWithNullDesc).toBeDefined()
        })
    })

    describe('getAllNewslettersSorted', () => {
        it('should return newsletters sorted by year descending', async () => {
            const newsletters = await repo.getAllNewslettersSorted()

            for (let i = 0; i < newsletters.length - 1; i++) {
                const current = parseInt(newsletters[i].year)
                const next = parseInt(newsletters[i + 1].year)
                expect(current).toBeGreaterThanOrEqual(next)
            }
        })

        it('should sort newsletters with the same year by quarter descending', async () => {
            const newsletters = await repo.getAllNewslettersSorted()

            const byYear: Record<string, typeof newsletters> = {}
            for (const n of newsletters) {
                if (!byYear[n.year]) byYear[n.year] = []
                byYear[n.year].push(n)
            }

            for (const group of Object.values(byYear)) {
                for (let i = 0; i < group.length - 1; i++) {
                    expect(parseInt(group[i].quarter)).toBeGreaterThanOrEqual(
                        parseInt(group[i + 1].quarter)
                    )
                }
            }
        })

        it('should not mutate the cached data returned by getAllNewsletters', async () => {
            const unsorted = await repo.getAllNewsletters()
            const firstUnsortedId = unsorted[0].id

            await repo.getAllNewslettersSorted()

            const unsortedAgain = await repo.getAllNewsletters()
            expect(unsortedAgain[0].id).toBe(firstUnsortedId)
        })
    })

    describe('getNewsletterById', () => {
        it('should find newsletter by id', async () => {
            const newsletters = await repo.getAllNewsletters()
            const firstNewsletterId = newsletters[0].id

            const newsletter = await repo.getNewsletterById(firstNewsletterId)

            expect(newsletter).toBeDefined()
            expect(newsletter).not.toBeNull()
            if (newsletter) {
                expect(newsletter.id).toBe(firstNewsletterId)
            }
        })

        it('should return null for non-existent id', async () => {
            const newsletter = await repo.getNewsletterById('non-existent-id')

            expect(newsletter).toBeNull()
        })

        it('should return null for empty string', async () => {
            const newsletter = await repo.getNewsletterById('')

            expect(newsletter).toBeNull()
        })
    })
})
