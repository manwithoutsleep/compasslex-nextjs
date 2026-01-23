# 2026-01-21T10-54-35-claude-issue-2-05: Page Implementations

## Parent Specification

This is sub-task 05 of the parent specification: `2026-01-21T10-54-35-claude-issue-2.md`
The sub-tasks are coordinated by `2026-01-21T10-54-35-claude-issue-2-00-coordinator.md`

## Objective

Implement all 9 pages of the CompassLex website using Next.js App Router with Server Components, connecting to the data repository layer, and ensuring pixel-perfect visual match to the Angular application. This is the core content implementation task.

## Dependencies

**Prerequisites** (must be completed before this task):

- Task 02: Core Infrastructure & Data Layer (repositories required)
- Task 03: Design System & Tailwind (UI components required)
- Task 04: Layouts, Navigation & Foundations (layout required)

**Blocks** (tasks that depend on this one):

- Task 07: Testing, QA & Deployment (requires all pages complete)

**Parallel Opportunities**:

- Task 06: Google Maps Integration (can run mostly in parallel - maps may integrate into contact-us page)

## Scope

### In Scope

**Pages to Implement** (9 total):

1. Home page (`app/page.tsx`) - Welcome content, intro
2. Meet Us page (`app/meet-us/page.tsx`) - Counselor listing grid
3. Counselor Detail page (`app/meet-us/[firstname]/page.tsx`) - Dynamic route for individual counselors
4. Newsletters page (`app/newsletters/page.tsx`) - Newsletter archive listing
5. Our Services page (`app/our-services/page.tsx`) - Services information
6. FAQ page (`app/faq/page.tsx`) - Frequently asked questions
7. Getting Started page (`app/getting-started/page.tsx`) - Onboarding information
8. Resources page (`app/resources/page.tsx`) - Resource links
9. Contact Us page (`app/contact-us/page.tsx`) - Contact information (NO FORM)

**Components to Create**:

- CounselorCard component - Display counselor summary
- CounselorDetail component - Display full counselor profile
- NewsletterCard component - Display newsletter item
- Content components as needed

**Key Features**:

- Static generation for optimal performance
- Dynamic routing for counselor detail pages
- SEO metadata for each page
- Responsive design
- Data fetching from repositories
- TDD for all pages and components

### Out of Scope

- Contact form functionality (not in Angular app)
- Newsletter subscription feature
- Search functionality
- Filtering/sorting features
- User authentication
- Admin features

## Implementation Requirements

### Page Structure Overview

All pages follow this pattern:

1. **Server Component** (default in App Router)
2. **Fetch data** from repositories if needed
3. **Generate metadata** for SEO
4. **Render content** using UI components
5. **Static generation** where possible

### General TDD Pattern for Each Page

```typescript
// 1. Create test file: __tests__/app/[page]/page.test.tsx
// 2. Write failing tests
// 3. Implement page component
// 4. Verify tests pass
// 5. Manual visual check
```

## Implementation Steps

### Step 1: Home Page

**File**: `app/page.tsx`
**Test**: `__tests__/app/page.test.tsx`

**Requirements**:

- Welcome heading
- Introductory content about Compass Christian Counseling
- Match Angular home page content
- Static generation

**Reference**: `../compasslex.com/src/app/components/pages/home/home.component.html`

### Step 2: Meet Us Page (Counselor Listing)

**File**: `app/meet-us/page.tsx`
**Test**: `__tests__/app/meet-us/page.test.tsx`
**Component**: `components/counselor-card.tsx`
**Component Test**: `__tests__/components/counselor-card.test.tsx`

**Requirements**:

- Fetch all counselors from CounselorRepository
- Display in responsive grid (1 col mobile, 2 col tablet, 3 col desktop)
- Each card shows: name, titles, short description, link to detail
- Static generation

**Reference**: `../compasslex.com/src/app/components/pages/meet-us/meet-us.component.html`

### Step 3: Counselor Detail Page (Dynamic Route)

**File**: `app/meet-us/[firstname]/page.tsx`
**Test**: `__tests__/app/meet-us/[firstname]/page.test.tsx`

**Requirements**:

- Dynamic route parameter: `[firstname]`
- Implement `generateStaticParams()` for all counselors
- Fetch counselor by name from CounselorRepository
- Return 404 if counselor not found
- Display: full bio, credentials, insurance, memberships, contact info
- Generate metadata dynamically per counselor
- Static generation for all 11 counselors

**Reference**: `../compasslex.com/src/app/components/pages/counselor-detail/counselor-detail.component.html`

### Step 4: Newsletters Page

**File**: `app/newsletters/page.tsx`
**Test**: `__tests__/app/newsletters/page.test.tsx`
**Component**: `components/newsletter-card.tsx`
**Component Test**: `__tests__/components/newsletter-card.test.tsx`

**Requirements**:

- Fetch all newsletters from NewsletterRepository
- Display in chronological order (newest first)
- Each card shows: title, year, quarter, description, PDF download link
- PDF links point to `public/assets/newsletters/*.pdf`
- Static generation

**Reference**: `../compasslex.com/src/app/components/pages/newsletters/newsletters.component.html`

### Step 5-9: Remaining Content Pages

Each follows similar pattern:

**Our Services** (`app/our-services/page.tsx`):

- Static content about counseling services
- No data fetching needed
- Reference: `../compasslex.com/src/app/components/pages/our-services/`

**FAQ** (`app/faq/page.tsx`):

- Question and answer format
- Consider accordion component for UX
- Reference: `../compasslex.com/src/app/components/pages/faq/`

**Getting Started** (`app/getting-started/page.tsx`):

- Onboarding information for new clients
- Step-by-step guidance
- Reference: `../compasslex.com/src/app/components/pages/getting-started/`

**Resources** (`app/resources/page.tsx`):

- Links to external resources
- Resource cards or list
- Reference: `../compasslex.com/src/app/components/pages/resources/`

**Contact Us** (`app/contact-us/page.tsx`):

- Contact information (phone, email, address)
- Office hours
- Google Maps integration (Task 06 will add map component)
- NO contact form (not in Angular app)
- Reference: `../compasslex.com/src/app/components/pages/contact-us/`

## Example Implementation Pattern

### Example: Meet Us Page

```typescript
// app/meet-us/page.tsx
import { CounselorRepository } from '@/services/data-repository'
import CounselorCard from '@/components/counselor-card'
import { Heading } from '@/components/ui'

export const metadata = {
  title: 'Meet Our Counselors - Compass Christian Counseling',
  description: 'Meet our professional Christian counselors in Lexington, Kentucky',
}

export default async function MeetUsPage() {
  const repo = new CounselorRepository()
  const counselors = await repo.getAllCounselors()

  return (
    <div className="py-8">
      <Heading level={1}>Meet Our Counselors</Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {counselors.map((counselor) => (
          <CounselorCard key={counselor.id} counselor={counselor} />
        ))}
      </div>
    </div>
  )
}
```

### Example: CounselorCard Component

```typescript
// components/counselor-card.tsx
import Link from 'next/link'
import { Card, CardTitle, CardBody } from '@/components/ui'
import type { Counselor } from '@/types/models'

interface CounselorCardProps {
  counselor: Counselor
}

export default function CounselorCard({ counselor }: CounselorCardProps) {
  return (
    <Card>
      <CardTitle>
        {counselor.firstname} {counselor.lastname}
      </CardTitle>
      <CardBody>
        <p className="text-sm text-raspberry-smoothie mb-2">
          {counselor.titles.join(', ')}
        </p>
        <p className="text-gray-700 mb-4">{counselor.shortdescription}</p>
        <Link
          href={`/meet-us/${counselor.firstname}`}
          className="text-deep-sapphire hover:text-royal-indigo font-medium"
        >
          Learn More →
        </Link>
      </CardBody>
    </Card>
  )
}
```

### Example: Counselor Detail with generateStaticParams

```typescript
// app/meet-us/[firstname]/page.tsx
import { notFound } from 'next/navigation'
import { CounselorRepository } from '@/services/data-repository'

export async function generateStaticParams() {
  const repo = new CounselorRepository()
  const counselors = await repo.getAllCounselors()
  return counselors.map((counselor) => ({
    firstname: counselor.firstname,
  }))
}

export async function generateMetadata({ params }: { params: { firstname: string } }) {
  const repo = new CounselorRepository()
  const counselor = await repo.getCounselorByName(params.firstname)
  if (!counselor) return {}

  return {
    title: `${counselor.firstname} ${counselor.lastname} - Compass Christian Counseling`,
    description: counselor.shortdescription,
  }
}

export default async function CounselorDetailPage({
  params,
}: {
  params: { firstname: string }
}) {
  const repo = new CounselorRepository()
  const counselor = await repo.getCounselorByName(params.firstname)

  if (!counselor) {
    notFound()
  }

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-deep-sapphire mb-2">
        {counselor.firstname} {counselor.lastname}
      </h1>
      <p className="text-lg text-raspberry-smoothie mb-6">
        {counselor.titles.join(', ')}
      </p>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: counselor.longdescription }}
      />
      {/* Add sections for credentials, insurance, memberships */}
    </div>
  )
}
```

## Files to Create/Modify

**Pages** (9 files):

- `app/page.tsx` + test
- `app/meet-us/page.tsx` + test
- `app/meet-us/[firstname]/page.tsx` + test
- `app/newsletters/page.tsx` + test
- `app/our-services/page.tsx` + test
- `app/faq/page.tsx` + test
- `app/getting-started/page.tsx` + test
- `app/resources/page.tsx` + test
- `app/contact-us/page.tsx` + test

**Components** (minimum 3, more as needed):

- `components/counselor-card.tsx` + test
- `components/newsletter-card.tsx` + test
- Additional components as needed

**404 Page**:

- `app/not-found.tsx` (for counselor detail 404s)

## Testing Requirements

### Unit Tests (Per Page/Component)

- Page renders correctly
- Data fetching works
- Content displays correctly
- Links work
- Responsive layout

### Integration Tests

- Navigation between pages works
- Data from repositories displays correctly
- Dynamic routes work

### Manual Testing

- Visual comparison with Angular app (side-by-side)
- All 11 counselors display correctly
- All 24 newsletters display correctly
- PDF downloads work
- Responsive on mobile/tablet/desktop
- All navigation links work

## Success Criteria

- [ ] All 9 pages implemented with tests
- [ ] All page tests pass
- [ ] CounselorCard component created with tests
- [ ] NewsletterCard component created with tests
- [ ] All component tests pass
- [ ] Static generation works for all pages
- [ ] Dynamic routing works for counselor detail pages
- [ ] generateStaticParams generates all 11 counselor routes
- [ ] All metadata configured correctly
- [ ] All 11 counselors display correctly
- [ ] All 24 newsletters display correctly
- [ ] PDF download links work
- [ ] TypeScript compilation succeeds
- [ ] ESLint passes
- [ ] Prettier formatting applied
- [ ] Build completes successfully (`npm run build`)
- [ ] All pages visually match Angular app
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Test coverage >70% for pages

## Notes

### Content Migration Strategy

1. **Read Angular component HTML** for structure
2. **Extract text content** exactly as-is
3. **Convert Angular syntax** to React/Next.js
4. **Apply Tailwind classes** matching Angular SCSS
5. **Test visual match** side-by-side

### Static Generation Verification

After build, verify static HTML generated:

```powershell
# Build the app
npm run build

# Check output
Get-ChildItem .next/server/app -Recurse -Include "*.html"

# Should see:
# - page.html (home)
# - meet-us/page.html
# - meet-us/[firstname]/[name].html (11 files)
# - newsletters/page.html
# - etc.
```

### Dangerously Set Inner HTML

Counselor `longdescription` contains HTML. Use with caution:

```typescript
<div dangerouslySetInnerHTML={{ __html: counselor.longdescription }} />
```

This is acceptable because:

- Content is from trusted JSON (not user input)
- Content is static (not dynamic)
- Matches Angular implementation

### Performance Optimization

- Use Next.js `<Image>` component for images (if any)
- Lazy load images below the fold
- Ensure static generation for all pages possible
- Monitor bundle size

---

**Task Created**: 2026-01-21
**Estimated Duration**: 24-36 hours
**Complexity**: High
**Risk Level**: Medium
