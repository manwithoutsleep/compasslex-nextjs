import { z } from 'zod'

/**
 * Zod schema for counselor validation
 */
export const CounselorSchema = z.object({
  appointmentlink: z.string(),
  credentials: z.array(z.string()),
  directoryid: z.string(),
  email: z.string().email('Invalid email format'),
  firstname: z.string().min(1, 'First name is required'),
  insurance: z.array(z.string()),
  lastname: z.string().min(1, 'Last name is required'),
  longdescription: z.string(),
  memberships: z.array(z.string()),
  phone: z.string(),
  practitionerid: z.string(),
  shortdescription: z.string(),
  titles: z.array(z.string()),
  id: z.string().min(1, 'ID is required'),
})

/**
 * Zod schema for newsletter validation
 */
export const NewsletterSchema = z.object({
  description: z.string().nullable(),
  id: z.string().min(1, 'ID is required'),
  quarter: z.string().regex(/^[1-4]$/, 'Quarter must be 1, 2, 3, or 4'),
  title: z.string().min(1, 'Title is required'),
  year: z.string().regex(/^\d{4}$/, 'Year must be a 4-digit number'),
})

/**
 * Zod schema for counselor data wrapper
 */
export const CounselorDataSchema = z.object({
  counselorList: z.array(CounselorSchema),
})

/**
 * Zod schema for newsletter data wrapper
 */
export const NewsletterDataSchema = z.object({
  newsletterList: z.array(NewsletterSchema),
})

/**
 * Represents a counselor profile
 */
export interface Counselor {
  /** Link to online appointment scheduling */
  appointmentlink: string
  /** Professional credentials (e.g., MA, LPC, LPCC) */
  credentials: string[]
  /** Directory ID for counselor */
  directoryid: string
  /** Contact email address */
  email: string
  /** First name */
  firstname: string
  /** Accepted insurance providers */
  insurance: string[]
  /** Last name */
  lastname: string
  /** Full HTML bio/description */
  longdescription: string
  /** Professional memberships */
  memberships: string[]
  /** Contact phone number */
  phone: string
  /** Practitioner ID */
  practitionerid: string
  /** Brief text description */
  shortdescription: string
  /** Professional titles */
  titles: string[]
  /** Unique identifier */
  id: string
}

/**
 * Represents a newsletter
 */
export interface Newsletter {
  /** Optional newsletter description */
  description: string | null
  /** Unique identifier */
  id: string
  /** Quarter (1, 2, 3, 4) */
  quarter: string
  /** Newsletter title */
  title: string
  /** Year */
  year: string
}

/**
 * Container for counselor data from JSON
 */
export interface CounselorData {
  /** Array of counselors */
  counselorList: Counselor[]
}

/**
 * Container for newsletter data from JSON
 */
export interface NewsletterData {
  /** Array of newsletters */
  newsletterList: Newsletter[]
}
