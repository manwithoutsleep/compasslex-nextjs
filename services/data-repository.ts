import { readFile } from 'fs/promises'
import { join } from 'path'
import type { Counselor, Newsletter, CounselorData, NewsletterData } from '@/types/models'

/**
 * Interface for counselor data access
 */
export interface ICounselorRepository {
  /**
   * Retrieve all counselors
   */
  getAllCounselors(): Promise<Counselor[]>

  /**
   * Find counselor by first name (case-insensitive)
   * @param firstname - First name to search for
   * @returns Counselor if found, null otherwise
   */
  getCounselorByName(firstname: string): Promise<Counselor | null>
}

/**
 * Interface for newsletter data access
 */
export interface INewsletterRepository {
  /**
   * Retrieve all newsletters
   */
  getAllNewsletters(): Promise<Newsletter[]>

  /**
   * Find newsletter by ID
   * @param id - Newsletter ID to search for
   * @returns Newsletter if found, null otherwise
   */
  getNewsletterById(id: string): Promise<Newsletter | null>
}

/**
 * Repository for counselor data
 * Reads from static JSON file in public directory
 */
export class CounselorRepository implements ICounselorRepository {
  private dataPath = join(process.cwd(), 'public', 'data', 'counselor.json')
  private cachedData: Counselor[] | null = null

  /**
   * Retrieve all counselors from JSON file
   * Uses in-memory cache to avoid redundant file I/O
   * @throws Error if file cannot be read, JSON is invalid, or data structure is incorrect
   */
  async getAllCounselors(): Promise<Counselor[]> {
    if (this.cachedData === null) {
      try {
        const raw = await readFile(this.dataPath, 'utf-8')
        const data: CounselorData = JSON.parse(raw)

        if (!data.counselorList || !Array.isArray(data.counselorList)) {
          throw new Error('Invalid counselor data format: counselorList is missing or not an array')
        }

        this.cachedData = data.counselorList
      } catch (error) {
        if (error instanceof SyntaxError) {
          throw new Error(`Failed to parse counselor data: Invalid JSON format - ${error.message}`)
        }
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
          throw new Error(`Counselor data file not found at ${this.dataPath}`)
        }
        throw error
      }
    }
    return this.cachedData
  }

  /**
   * Find counselor by first name (case-insensitive)
   */
  async getCounselorByName(firstname: string): Promise<Counselor | null> {
    if (!firstname) return null

    const counselors = await this.getAllCounselors()
    const normalizedSearch = firstname.toLowerCase()

    return counselors.find((c) => c.firstname.toLowerCase() === normalizedSearch) || null
  }
}

/**
 * Repository for newsletter data
 * Reads from static JSON file in public directory
 */
export class NewsletterRepository implements INewsletterRepository {
  private dataPath = join(process.cwd(), 'public', 'data', 'newsletter.json')
  private cachedData: Newsletter[] | null = null

  /**
   * Retrieve all newsletters from JSON file
   * Uses in-memory cache to avoid redundant file I/O
   * @throws Error if file cannot be read, JSON is invalid, or data structure is incorrect
   */
  async getAllNewsletters(): Promise<Newsletter[]> {
    if (this.cachedData === null) {
      try {
        const raw = await readFile(this.dataPath, 'utf-8')
        const data: NewsletterData = JSON.parse(raw)

        if (!data.newsletterList || !Array.isArray(data.newsletterList)) {
          throw new Error(
            'Invalid newsletter data format: newsletterList is missing or not an array'
          )
        }

        this.cachedData = data.newsletterList
      } catch (error) {
        if (error instanceof SyntaxError) {
          throw new Error(`Failed to parse newsletter data: Invalid JSON format - ${error.message}`)
        }
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
          throw new Error(`Newsletter data file not found at ${this.dataPath}`)
        }
        throw error
      }
    }
    return this.cachedData
  }

  /**
   * Find newsletter by ID
   */
  async getNewsletterById(id: string): Promise<Newsletter | null> {
    if (!id) return null

    const newsletters = await this.getAllNewsletters()
    return newsletters.find((n) => n.id === id) || null
  }
}
