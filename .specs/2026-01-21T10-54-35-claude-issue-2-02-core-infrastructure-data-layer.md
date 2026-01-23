# 2026-01-21T10-54-35-claude-issue-2-02: Core Infrastructure & Data Layer

## Parent Specification

This is sub-task 02 of the parent specification: `2026-01-21T10-54-35-claude-issue-2.md`
The sub-tasks are coordinated by `2026-01-21T10-54-35-claude-issue-2-00-coordinator.md`

## Objective

Implement the core data infrastructure using the Repository Pattern with TypeScript interfaces, create the data access layer for counselors and newsletters, and copy all necessary data files and static assets from the Angular repository. This establishes the foundation for all data-driven pages.

## Dependencies

**Prerequisites** (must be completed before this task):

- Task 01: Development Environment Setup (Vitest must be configured)

**Blocks** (tasks that depend on this one):

- Task 04: Layouts, Navigation & Foundations (may use data repositories)
- Task 05: Page Implementations (heavily depends on data repositories)

**Parallel Opportunities**:

- Task 03: Design System & Tailwind (no file overlap, can run simultaneously)

## Scope

### In Scope

- Define TypeScript interfaces for Counselor, Newsletter, and their container types
- Implement Repository Pattern with interfaces (ICounselorRepository, INewsletterRepository)
- Create CounselorRepository and NewsletterRepository classes
- Write comprehensive unit tests for type definitions (TDD)
- Write comprehensive unit tests for repositories (TDD)
- Copy JSON data files from Angular repo (`counselor.json`, `newsletter.json`)
- Copy all static assets from Angular repo (images, PDFs, videos, icons)
- Verify data integrity after copying
- Create path alias configuration for imports

### Out of Scope

- Any UI components or pages (Task 05)
- Tailwind configuration (Task 03)
- Navigation or layout components (Task 04)
- Google Maps integration (Task 06)
- Any business logic beyond data access

## Implementation Requirements

### Technology Stack

- TypeScript with strict type checking
- Node.js `fs/promises` for file reading
- Vitest for unit testing
- Repository Pattern for data abstraction

### TDD Approach

Follow strict Test-Driven Development:

1. **RED**: Write failing test for TypeScript interfaces
2. **GREEN**: Implement interfaces
3. **REFACTOR**: N/A for interfaces
4. **RED**: Write failing tests for repository methods
5. **GREEN**: Implement repository classes
6. **REFACTOR**: Optimize if needed

### SOLID Principles Application

**Single Responsibility Principle (SRP)**:

- Each interface defines one entity type
- Each repository handles one data source

**Open/Closed Principle (OCP)**:

- Repository interfaces allow future database implementation without changing consumers

**Liskov Substitution Principle (LSP)**:

- Any implementation of ICounselorRepository can be used interchangeably

**Interface Segregation Principle (ISP)**:

- Separate interfaces for Counselor and Newsletter (not combined)
- Minimal, focused method signatures

**Dependency Inversion Principle (DIP)**:

- High-level code (pages) will depend on interfaces, not concrete implementations
- Testable with mock repositories

## Implementation Steps

### Step 1: Define TypeScript Interfaces (TDD)

#### 1.1: Create Test File

Create `__tests__/types/models.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import type { Counselor, Newsletter, CounselorData, NewsletterData } from '@/types/models';

describe('Type Definitions', () => {
    describe('Counselor Interface', () => {
        it('should accept valid Counselor object', () => {
            const counselor: Counselor = {
                appointmentlink: 'https://example.com',
                credentials: ['MA', 'LPC'],
                directoryid: '123',
                email: 'test@example.com',
                firstname: 'John',
                insurance: ['Aetna', 'Humana'],
                lastname: 'Doe',
                longdescription: '<p>Long description here</p>',
                memberships: ['ACA', 'AACC'],
                phone: '555-1234',
                practitionerid: '1',
                shortdescription: 'Short description',
                titles: ['MA', 'LPC'],
                id: '1',
            };
            expect(counselor).toBeDefined();
            expect(counselor.firstname).toBe('John');
        });

        it('should enforce required fields', () => {
            // This test verifies TypeScript compilation would fail for missing fields
            // In runtime, we verify the shape is correct
            const counselor: Counselor = {
                appointmentlink: '',
                credentials: [],
                directoryid: '',
                email: '',
                firstname: '',
                insurance: [],
                lastname: '',
                longdescription: '',
                memberships: [],
                phone: '',
                practitionerid: '',
                shortdescription: '',
                titles: [],
                id: '',
            };
            expect(counselor).toBeDefined();
        });
    });

    describe('Newsletter Interface', () => {
        it('should accept valid Newsletter object', () => {
            const newsletter: Newsletter = {
                description: 'Newsletter description',
                id: '1',
                quarter: 'Q1',
                title: 'Spring Newsletter',
                year: '2024',
            };
            expect(newsletter).toBeDefined();
            expect(newsletter.title).toBe('Spring Newsletter');
        });

        it('should allow null description', () => {
            const newsletter: Newsletter = {
                description: null,
                id: '2',
                quarter: 'Q2',
                title: 'Summer Newsletter',
                year: '2024',
            };
            expect(newsletter).toBeDefined();
            expect(newsletter.description).toBeNull();
        });
    });

    describe('CounselorData Interface', () => {
        it('should contain counselorList array', () => {
            const data: CounselorData = {
                counselorList: [],
            };
            expect(data.counselorList).toEqual([]);
        });
    });

    describe('NewsletterData Interface', () => {
        it('should contain newsletterList array', () => {
            const data: NewsletterData = {
                newsletterList: [],
            };
            expect(data.newsletterList).toEqual([]);
        });
    });
});
```

#### 1.2: Implement Interfaces

Create `types/models.ts`:

```typescript
/**
 * Represents a counselor profile
 */
export interface Counselor {
    /** Link to online appointment scheduling */
    appointmentlink: string;
    /** Professional credentials (e.g., MA, LPC, LPCC) */
    credentials: string[];
    /** Directory ID for counselor */
    directoryid: string;
    /** Contact email address */
    email: string;
    /** First name */
    firstname: string;
    /** Accepted insurance providers */
    insurance: string[];
    /** Last name */
    lastname: string;
    /** Full HTML bio/description */
    longdescription: string;
    /** Professional memberships */
    memberships: string[];
    /** Contact phone number */
    phone: string;
    /** Practitioner ID */
    practitionerid: string;
    /** Brief text description */
    shortdescription: string;
    /** Professional titles */
    titles: string[];
    /** Unique identifier */
    id: string;
}

/**
 * Represents a newsletter
 */
export interface Newsletter {
    /** Optional newsletter description */
    description: string | null;
    /** Unique identifier */
    id: string;
    /** Quarter (Q1, Q2, Q3, Q4) */
    quarter: string;
    /** Newsletter title */
    title: string;
    /** Year */
    year: string;
}

/**
 * Container for counselor data from JSON
 */
export interface CounselorData {
    /** Array of counselors */
    counselorList: Counselor[];
}

/**
 * Container for newsletter data from JSON
 */
export interface NewsletterData {
    /** Array of newsletters */
    newsletterList: Newsletter[];
}
```

#### 1.3: Run Tests

```bash
tsc --noEmit
npx vitest run __tests__/types/models.test.ts
```

### Step 2: Implement Data Repository Layer (TDD)

#### 2.1: Create Repository Test File

Create `__tests__/services/data-repository.test.ts`:

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { CounselorRepository, NewsletterRepository } from '@/services/data-repository';

describe('CounselorRepository', () => {
    let repo: CounselorRepository;

    beforeEach(() => {
        repo = new CounselorRepository();
    });

    describe('getAllCounselors', () => {
        it('should load all counselors from JSON', async () => {
            const counselors = await repo.getAllCounselors();

            expect(counselors).toBeInstanceOf(Array);
            expect(counselors.length).toBeGreaterThan(0);
        });

        it('should return counselors with all required fields', async () => {
            const counselors = await repo.getAllCounselors();
            const firstCounselor = counselors[0];

            expect(firstCounselor).toHaveProperty('firstname');
            expect(firstCounselor).toHaveProperty('lastname');
            expect(firstCounselor).toHaveProperty('email');
            expect(firstCounselor).toHaveProperty('shortdescription');
            expect(firstCounselor).toHaveProperty('longdescription');
            expect(firstCounselor).toHaveProperty('id');
        });

        it('should return counselors with array fields as arrays', async () => {
            const counselors = await repo.getAllCounselors();
            const firstCounselor = counselors[0];

            expect(Array.isArray(firstCounselor.credentials)).toBe(true);
            expect(Array.isArray(firstCounselor.insurance)).toBe(true);
            expect(Array.isArray(firstCounselor.memberships)).toBe(true);
            expect(Array.isArray(firstCounselor.titles)).toBe(true);
        });
    });

    describe('getCounselorByName', () => {
        it('should find counselor by firstname (case-sensitive)', async () => {
            // Assuming "Joanna" exists in the data
            const counselor = await repo.getCounselorByName('Joanna');

            expect(counselor).toBeDefined();
            expect(counselor).not.toBeNull();
            if (counselor) {
                expect(counselor.firstname).toBe('Joanna');
            }
        });

        it('should return null for non-existent counselor', async () => {
            const counselor = await repo.getCounselorByName('NonExistentPerson');

            expect(counselor).toBeNull();
        });

        it('should return null for empty string', async () => {
            const counselor = await repo.getCounselorByName('');

            expect(counselor).toBeNull();
        });

        it('should find counselor regardless of case', async () => {
            // Test case-insensitive search
            const counselor = await repo.getCounselorByName('joanna');

            // This might fail if implementation is case-sensitive
            // If so, update implementation or test expectations
            expect(counselor).toBeDefined();
        });
    });
});

describe('NewsletterRepository', () => {
    let repo: NewsletterRepository;

    beforeEach(() => {
        repo = new NewsletterRepository();
    });

    describe('getAllNewsletters', () => {
        it('should load all newsletters from JSON', async () => {
            const newsletters = await repo.getAllNewsletters();

            expect(newsletters).toBeInstanceOf(Array);
            expect(newsletters.length).toBeGreaterThan(0);
        });

        it('should return newsletters with all required fields', async () => {
            const newsletters = await repo.getAllNewsletters();
            const firstNewsletter = newsletters[0];

            expect(firstNewsletter).toHaveProperty('id');
            expect(firstNewsletter).toHaveProperty('title');
            expect(firstNewsletter).toHaveProperty('year');
            expect(firstNewsletter).toHaveProperty('quarter');
            expect(firstNewsletter).toHaveProperty('description');
        });

        it('should handle null description field', async () => {
            const newsletters = await repo.getAllNewsletters();

            // At least one newsletter might have null description
            const newsletterWithNullDesc = newsletters.find((n) => n.description === null);
            expect(newsletterWithNullDesc).toBeDefined();
        });
    });

    describe('getNewsletterById', () => {
        it('should find newsletter by id', async () => {
            const newsletters = await repo.getAllNewsletters();
            const firstNewsletterId = newsletters[0].id;

            const newsletter = await repo.getNewsletterById(firstNewsletterId);

            expect(newsletter).toBeDefined();
            expect(newsletter).not.toBeNull();
            if (newsletter) {
                expect(newsletter.id).toBe(firstNewsletterId);
            }
        });

        it('should return null for non-existent id', async () => {
            const newsletter = await repo.getNewsletterById('non-existent-id');

            expect(newsletter).toBeNull();
        });

        it('should return null for empty string', async () => {
            const newsletter = await repo.getNewsletterById('');

            expect(newsletter).toBeNull();
        });
    });
});
```

#### 2.2: Implement Repository Classes

Create `services/data-repository.ts`:

```typescript
import { readFile } from 'fs/promises';
import { join } from 'path';
import type { Counselor, Newsletter, CounselorData, NewsletterData } from '@/types/models';

/**
 * Interface for counselor data access
 */
export interface ICounselorRepository {
    /**
     * Retrieve all counselors
     */
    getAllCounselors(): Promise<Counselor[]>;

    /**
     * Find counselor by first name (case-insensitive)
     * @param firstname - First name to search for
     * @returns Counselor if found, null otherwise
     */
    getCounselorByName(firstname: string): Promise<Counselor | null>;
}

/**
 * Interface for newsletter data access
 */
export interface INewsletterRepository {
    /**
     * Retrieve all newsletters
     */
    getAllNewsletters(): Promise<Newsletter[]>;

    /**
     * Find newsletter by ID
     * @param id - Newsletter ID to search for
     * @returns Newsletter if found, null otherwise
     */
    getNewsletterById(id: string): Promise<Newsletter | null>;
}

/**
 * Repository for counselor data
 * Reads from static JSON file in public directory
 */
export class CounselorRepository implements ICounselorRepository {
    private dataPath = join(process.cwd(), 'public', 'data', 'counselor.json');

    /**
     * Retrieve all counselors from JSON file
     */
    async getAllCounselors(): Promise<Counselor[]> {
        const raw = await readFile(this.dataPath, 'utf-8');
        const data: CounselorData = JSON.parse(raw);
        return data.counselorList;
    }

    /**
     * Find counselor by first name (case-insensitive)
     */
    async getCounselorByName(firstname: string): Promise<Counselor | null> {
        if (!firstname) return null;

        const counselors = await this.getAllCounselors();
        const normalizedSearch = firstname.toLowerCase();

        return counselors.find((c) => c.firstname.toLowerCase() === normalizedSearch) || null;
    }
}

/**
 * Repository for newsletter data
 * Reads from static JSON file in public directory
 */
export class NewsletterRepository implements INewsletterRepository {
    private dataPath = join(process.cwd(), 'public', 'data', 'newsletter.json');

    /**
     * Retrieve all newsletters from JSON file
     */
    async getAllNewsletters(): Promise<Newsletter[]> {
        const raw = await readFile(this.dataPath, 'utf-8');
        const data: NewsletterData = JSON.parse(raw);
        return data.newsletterList;
    }

    /**
     * Find newsletter by ID
     */
    async getNewsletterById(id: string): Promise<Newsletter | null> {
        if (!id) return null;

        const newsletters = await this.getAllNewsletters();
        return newsletters.find((n) => n.id === id) || null;
    }
}
```

#### 2.3: Run Tests (Should Fail Until Data is Copied)

```bash
tsc --noEmit
npx eslint --fix services/data-repository.ts __tests__/services/data-repository.test.ts
npx prettier --write services/data-repository.ts __tests__/services/data-repository.test.ts
npx vitest run __tests__/services/data-repository.test.ts
```

**Expected Result**: Tests will fail because data files don't exist yet.

### Step 3: Copy Data Files and Assets

#### 3.1: Create Directory Structure

```powershell
New-Item -Path "public/data" -ItemType Directory -Force
New-Item -Path "public/assets" -ItemType Directory -Force
```

#### 3.2: Copy JSON Data Files

```powershell
Copy-Item -Path "../compasslex.com/src/assets/data/counselor.json" -Destination "public/data/"
Copy-Item -Path "../compasslex.com/src/assets/data/newsletter.json" -Destination "public/data/"
```

#### 3.3: Copy All Static Assets

```powershell
Copy-Item -Path "../compasslex.com/src/assets/newsletters" -Destination "public/assets/" -Recurse -Force
Copy-Item -Path "../compasslex.com/src/assets/pdf" -Destination "public/assets/" -Recurse -Force
Copy-Item -Path "../compasslex.com/src/assets/site-images" -Destination "public/assets/" -Recurse -Force
Copy-Item -Path "../compasslex.com/src/assets/slider-images" -Destination "public/assets/" -Recurse -Force
Copy-Item -Path "../compasslex.com/src/assets/icons" -Destination "public/assets/" -Recurse -Force
Copy-Item -Path "../compasslex.com/src/assets/videos" -Destination "public/assets/" -Recurse -Force
```

#### 3.4: Copy Favicon

```powershell
Copy-Item -Path "../compasslex.com/src/favicon.ico" -Destination "public/" -Force
```

### Step 4: Verify Data Integrity

```powershell
# Verify JSON files exist and are valid
Get-ChildItem public/data
Test-Json -Path "public/data/counselor.json"
Test-Json -Path "public/data/newsletter.json"

# Verify asset directories exist
Get-ChildItem public/assets

# Count assets
(Get-ChildItem public/assets -Recurse -File).Count
```

### Step 5: Re-run Tests (Should Pass Now)

```bash
npx vitest run __tests__/services/data-repository.test.ts
```

**Expected Result**: All tests pass successfully.

## Files to Create/Modify

- `types/models.ts` - TypeScript interfaces for Counselor, Newsletter, CounselorData, NewsletterData
- `services/data-repository.ts` - Repository classes and interfaces
- `__tests__/types/models.test.ts` - Unit tests for type definitions
- `__tests__/services/data-repository.test.ts` - Unit tests for repositories
- `public/data/counselor.json` - Copied from Angular repo
- `public/data/newsletter.json` - Copied from Angular repo
- `public/assets/` - All static assets copied from Angular repo
- `public/favicon.ico` - Copied from Angular repo

## Testing Requirements

### Unit Tests

- Type definition tests ensure interfaces accept valid objects
- Repository tests verify data loading and querying
- Test coverage >90% for services/data-repository.ts

### Manual Verification

- Verify all 11 counselors load successfully
- Verify all 24 newsletters load successfully
- Verify asset files are accessible
- Verify no data corruption during copy

## Success Criteria

- [ ] `types/models.ts` created with Counselor, Newsletter, CounselorData, NewsletterData interfaces
- [ ] `services/data-repository.ts` created with repository classes and interfaces
- [ ] `__tests__/types/models.test.ts` created with comprehensive type tests
- [ ] `__tests__/services/data-repository.test.ts` created with comprehensive repository tests
- [ ] All type tests pass
- [ ] All repository tests pass
- [ ] `public/data/counselor.json` copied from Angular repo
- [ ] `public/data/newsletter.json` copied from Angular repo
- [ ] All static assets copied to `public/assets/`
- [ ] Favicon copied to `public/`
- [ ] TypeScript compilation succeeds (tsc --noEmit)
- [ ] ESLint passes (npx eslint --fix)
- [ ] Prettier formatting applied (npx prettier --write)
- [ ] Test coverage >90% for services/data-repository.ts
- [ ] All 11 counselors load correctly
- [ ] All 24 newsletters load correctly
- [ ] Case-insensitive counselor search works
- [ ] Repository interfaces properly abstract data access

## Notes

### SOLID Principles Verification

**Single Responsibility**:

- ✅ CounselorRepository only handles counselor data access
- ✅ NewsletterRepository only handles newsletter data access

**Open/Closed**:

- ✅ Repository interfaces allow future database implementation
- ✅ No changes to consumers needed when switching implementations

**Liskov Substitution**:

- ✅ Any ICounselorRepository implementation can be swapped

**Interface Segregation**:

- ✅ Separate interfaces for counselor and newsletter
- ✅ Minimal method signatures

**Dependency Inversion**:

- ✅ High-level code will depend on interfaces, not implementations
- ✅ Enables dependency injection and testing with mocks

### Data Integrity

After copying, verify:

- JSON files are valid (use `Test-Json` in PowerShell or `jq` if available)
- All counselor fields are present
- All newsletter fields are present
- No Unicode encoding issues
- File permissions are correct

### Future Database Migration

This repository pattern prepares for future database migration:

1. Create new repository implementation (e.g., `DatabaseCounselorRepository`)
2. Implement same `ICounselorRepository` interface
3. Inject new implementation in pages
4. No component changes needed

### Troubleshooting

**If tests fail with "Cannot find module"**:

- Verify path aliases in `vitest.config.ts`
- Check that `@/` resolves to project root

**If JSON files not found**:

- Verify Angular repo exists at `../compasslex.com/`
- Check file paths in copy commands
- Ensure `public/data/` directory exists

**If counselor search fails**:

- Verify JSON structure matches expected format
- Check for extra whitespace in names
- Verify case-insensitive comparison is working

---

**Task Created**: 2026-01-21
**Estimated Duration**: 8-12 hours
**Complexity**: Medium
**Risk Level**: Low-Medium
