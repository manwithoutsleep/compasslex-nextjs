import { readFile } from 'fs/promises'
import { join } from 'path'
import { z } from 'zod'
import type { Counselor, Newsletter } from '@/types/models'
import { CounselorDataSchema, NewsletterDataSchema } from '@/types/models'

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
                const parsed = JSON.parse(raw)

                // Runtime validation with Zod
                const validatedData = CounselorDataSchema.parse(parsed)

                this.cachedData = validatedData.counselorList
            } catch (error) {
                if (error instanceof z.ZodError) {
                    const issues = error.issues
                        .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
                        .join(', ')
                    throw new Error(`Invalid counselor data structure: ${issues}`)
                }
                if (error instanceof SyntaxError) {
                    throw new Error(
                        `Failed to parse counselor data: Invalid JSON format - ${error.message}`
                    )
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

        return counselors.find((c) => c.firstName.toLowerCase() === normalizedSearch) || null
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
                const parsed = JSON.parse(raw)

                // Runtime validation with Zod
                const validatedData = NewsletterDataSchema.parse(parsed)

                this.cachedData = validatedData.newsletterList
            } catch (error) {
                if (error instanceof z.ZodError) {
                    const issues = error.issues
                        .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
                        .join(', ')
                    throw new Error(`Invalid newsletter data structure: ${issues}`)
                }
                if (error instanceof SyntaxError) {
                    throw new Error(
                        `Failed to parse newsletter data: Invalid JSON format - ${error.message}`
                    )
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

/**
 * Singleton instance of CounselorRepository
 * Use this shared instance throughout the application to ensure efficient caching
 * and prevent duplicate instances
 *
 * @example
 * ```typescript
 * import { counselorRepository } from '@/services/data-repository'
 *
 * const counselors = await counselorRepository.getAllCounselors()
 * const joanna = await counselorRepository.getCounselorByName('Joanna')
 * ```
 */
export const counselorRepository = new CounselorRepository()

/**
 * Singleton instance of NewsletterRepository
 * Use this shared instance throughout the application to ensure efficient caching
 * and prevent duplicate instances
 *
 * @example
 * ```typescript
 * import { newsletterRepository } from '@/services/data-repository'
 *
 * const newsletters = await newsletterRepository.getAllNewsletters()
 * const newsletter = await newsletterRepository.getNewsletterById('some-id')
 * ```
 */
export const newsletterRepository = new NewsletterRepository()
