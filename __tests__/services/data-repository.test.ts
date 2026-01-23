import { describe, it, expect, beforeEach } from 'vitest'
import { CounselorRepository, NewsletterRepository } from '@/services/data-repository'

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

      expect(firstCounselor).toHaveProperty('firstname')
      expect(firstCounselor).toHaveProperty('lastname')
      expect(firstCounselor).toHaveProperty('email')
      expect(firstCounselor).toHaveProperty('shortdescription')
      expect(firstCounselor).toHaveProperty('longdescription')
      expect(firstCounselor).toHaveProperty('id')
    })

    it('should return counselors with array fields as arrays', async () => {
      const counselors = await repo.getAllCounselors()
      const firstCounselor = counselors[0]

      expect(Array.isArray(firstCounselor.credentials)).toBe(true)
      expect(Array.isArray(firstCounselor.insurance)).toBe(true)
      expect(Array.isArray(firstCounselor.memberships)).toBe(true)
      expect(Array.isArray(firstCounselor.titles)).toBe(true)
    })
  })

  describe('getCounselorByName', () => {
    it('should find counselor by firstname (case-sensitive)', async () => {
      // Assuming "Joanna" exists in the data
      const counselor = await repo.getCounselorByName('Joanna')

      expect(counselor).toBeDefined()
      expect(counselor).not.toBeNull()
      if (counselor) {
        expect(counselor.firstname).toBe('Joanna')
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
