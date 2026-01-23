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
  /** Quarter (Q1, Q2, Q3, Q4) */
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
