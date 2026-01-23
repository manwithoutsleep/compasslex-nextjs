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

  /**
   * Retrieve all counselors from JSON file
   */
  async getAllCounselors(): Promise<Counselor[]> {
    const raw = await readFile(this.dataPath, 'utf-8')
    const data: CounselorData = JSON.parse(raw)
    return data.counselorList
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

  /**
   * Retrieve all newsletters from JSON file
   */
  async getAllNewsletters(): Promise<Newsletter[]> {
    const raw = await readFile(this.dataPath, 'utf-8')
    const data: NewsletterData = JSON.parse(raw)
    return data.newsletterList
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
