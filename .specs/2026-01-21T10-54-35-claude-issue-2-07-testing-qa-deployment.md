# 2026-01-21T10-54-35-claude-issue-2-07: Testing, QA & Deployment Preparation

## Parent Specification

This is sub-task 07 of the parent specification: `2026-01-21T10-54-35-claude-issue-2.md`
The sub-tasks are coordinated by `2026-01-21T10-54-35-claude-issue-2-00-coordinator.md`

## Objective

Execute comprehensive testing strategy (unit, integration, E2E, visual regression), ensure quality standards are met, optimize for production, configure Vercel deployment, and prepare for final review and merge. This is the final validation before the migration goes live.

## Dependencies

**Prerequisites** (must be completed before this task):

- Task 05: Page Implementations (all pages must be complete)
- Task 06: Google Maps Integration (maps must work)
- All previous tasks (01-04) completed

**Blocks** (tasks that depend on this one):

- None - This is the final task before PR creation

**Parallel Opportunities**:

- None - This is sequential validation work

## Scope

### In Scope

**Testing**:

- Verify all unit tests pass (>75% coverage overall)
- Verify all integration tests pass
- Create and run E2E tests with Playwright
- Execute visual regression testing
- Verify test coverage meets targets
- Performance testing (Lighthouse audits)
- Accessibility testing (WCAG AA)
- Cross-browser testing

**Quality Assurance**:

- Code quality checks (TypeScript, ESLint, Prettier)
- Build verification
- Bundle size analysis
- Security audit
- SEO verification

**Deployment Preparation**:

- Vercel configuration
- Environment variable setup
- Performance optimization
- SEO metadata verification
- Documentation updates

**Pre-Launch Checklist**:

- Final manual testing
- Browser compatibility
- Mobile responsiveness
- Data integrity verification

### Out of Scope

- Actual deployment to production (manual by project owner)
- DNS configuration
- SSL certificate setup (Vercel handles)
- Monitoring/analytics setup (future enhancement)
- Creating PR (separate step after this task)

## Implementation Requirements

### Testing Strategy Overview

```
Unit Tests (Vitest) → Integration Tests (Vitest) → E2E Tests (Playwright) → Visual Regression (Playwright) → Manual QA
```

## Implementation Steps

### Phase 1: Unit Test Verification

#### Step 1.1: Run All Unit Tests

```bash
npx vitest run --coverage
```

**Success Criteria**:

- All tests pass
- Coverage >75% overall
- Coverage >90% for services/data-repository.ts
- Coverage >80% for components/
- Coverage >70% for app/ (pages)

#### Step 1.2: Review Coverage Report

```bash
# Open coverage report
start coverage/index.html  # Windows
```

**Action**: Identify any gaps in coverage and add tests if needed.

### Phase 2: Integration Testing

#### Step 2.1: Create Navigation Flow Integration Test

**File**: `__tests__/integration/navigation-flow.test.tsx`

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Navigation Flow Integration', () => {
    it('should navigate between pages', async () => {
        // Test navigation flow through multiple pages
        // This is a placeholder - actual implementation depends on routing setup
    });
});
```

#### Step 2.2: Create Data Loading Integration Test

**File**: `__tests__/integration/data-loading.test.tsx`

```typescript
import { describe, it, expect } from 'vitest';
import { CounselorRepository, NewsletterRepository } from '@/services/data-repository';

describe('Data Loading Integration', () => {
    it('should load all counselors successfully', async () => {
        const repo = new CounselorRepository();
        const counselors = await repo.getAllCounselors();

        expect(counselors).toHaveLength(11); // Verify count
        counselors.forEach((counselor) => {
            expect(counselor).toHaveProperty('firstname');
            expect(counselor).toHaveProperty('lastname');
            expect(counselor).toHaveProperty('email');
        });
    });

    it('should load all newsletters successfully', async () => {
        const repo = new NewsletterRepository();
        const newsletters = await repo.getAllNewsletters();

        expect(newsletters).toHaveLength(24); // Verify count
        newsletters.forEach((newsletter) => {
            expect(newsletter).toHaveProperty('title');
            expect(newsletter).toHaveProperty('year');
        });
    });
});
```

#### Step 2.3: Run Integration Tests

```bash
npx vitest run __tests__/integration/
```

### Phase 3: E2E Testing with Playwright

#### Step 3.1: Create Homepage E2E Test

**File**: `e2e/homepage.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
    test('should display correctly', async ({ page }) => {
        await page.goto('/');

        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
        await expect(page.getByRole('navigation')).toBeVisible();
    });

    test('should have working navigation links', async ({ page }) => {
        await page.goto('/');

        await page.getByRole('link', { name: 'Meet Us' }).click();
        await expect(page).toHaveURL(/\/meet-us/);
    });
});
```

#### Step 3.2: Create Counselor Flow E2E Test

**File**: `e2e/counselor-flow.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test.describe('Counselor Flow', () => {
    test('should navigate from meet-us to counselor detail', async ({ page }) => {
        await page.goto('/meet-us');

        // Click first counselor card
        await page.getByText('Joanna').first().click();

        await expect(page).toHaveURL(/\/meet-us\/Joanna/);
        await expect(page.getByRole('heading', { level: 1 })).toContainText('Joanna');
    });

    test('should display all 11 counselors', async ({ page }) => {
        await page.goto('/meet-us');

        // Count counselor cards
        const cards = page.locator('[data-testid="counselor-card"]');
        await expect(cards).toHaveCount(11);
    });
});
```

#### Step 3.3: Create Newsletter E2E Test

**File**: `e2e/newsletters.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test.describe('Newsletters', () => {
    test('should display all newsletters', async ({ page }) => {
        await page.goto('/newsletters');

        const cards = page.locator('[data-testid="newsletter-card"]');
        await expect(cards).toHaveCount(24);
    });

    test('should have working PDF download links', async ({ page }) => {
        await page.goto('/newsletters');

        const pdfLink = page.getByRole('link', { name: /download/i }).first();
        await expect(pdfLink).toHaveAttribute('href', /\.pdf$/);
    });
});
```

#### Step 3.4: Create Google Maps E2E Test

**File**: `e2e/google-maps.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test.describe('Google Maps', () => {
    test('should display map on contact-us page', async ({ page }) => {
        await page.goto('/contact-us');

        await expect(page.getByTestId('google-map')).toBeVisible();
    });
});
```

#### Step 3.5: Run E2E Tests

```bash
npx playwright install  # Install browsers if not already
npx playwright test
npx playwright test --ui  # Run with UI for debugging
```

### Phase 4: Visual Regression Testing

#### Step 4.1: Create Visual Regression Tests

**File**: `e2e/visual-regression.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test.describe('Visual Regression', () => {
    test('homepage visual regression', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveScreenshot('homepage.png', { fullPage: true });
    });

    test('meet-us page visual regression', async ({ page }) => {
        await page.goto('/meet-us');
        await expect(page).toHaveScreenshot('meet-us.png', { fullPage: true });
    });

    test('counselor detail visual regression', async ({ page }) => {
        await page.goto('/meet-us/Joanna');
        await expect(page).toHaveScreenshot('counselor-detail.png', { fullPage: true });
    });

    test('newsletters page visual regression', async ({ page }) => {
        await page.goto('/newsletters');
        await expect(page).toHaveScreenshot('newsletters.png', { fullPage: true });
    });

    test('contact-us page visual regression', async ({ page }) => {
        await page.goto('/contact-us');
        await expect(page).toHaveScreenshot('contact-us.png', { fullPage: true });
    });
});
```

#### Step 4.2: Generate Baseline Screenshots

```bash
npx playwright test e2e/visual-regression.spec.ts --update-snapshots
```

#### Step 4.3: Run Visual Regression Tests

```bash
npx playwright test e2e/visual-regression.spec.ts
```

### Phase 5: Performance Testing

#### Step 5.1: Lighthouse Audits

```bash
npm run build
npm run start

# In another terminal, run Lighthouse
npx lighthouse http://localhost:3000 --view
npx lighthouse http://localhost:3000/meet-us --view
npx lighthouse http://localhost:3000/newsletters --view
```

**Target Scores**:

- Performance: >90
- Accessibility: >90
- Best Practices: >90
- SEO: >90

#### Step 5.2: Bundle Size Analysis

```bash
npm run build

# Analyze bundle size
npx @next/bundle-analyzer
```

**Targets**:

- Total bundle size: <300KB (gzipped)
- First Load JS: <200KB
- Largest page: <250KB

### Phase 6: Accessibility Testing

#### Step 6.1: Automated Accessibility Audit

```bash
# Install axe
npm install -D @axe-core/playwright

# Run accessibility tests (add to Playwright tests)
```

**File**: `e2e/accessibility.spec.ts`

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
    test('homepage should not have accessibility violations', async ({ page }) => {
        await page.goto('/');

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('meet-us page should not have accessibility violations', async ({ page }) => {
        await page.goto('/meet-us');

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    });
});
```

#### Step 6.2: Manual Accessibility Testing

- [ ] Test keyboard navigation (Tab, Enter, Escape)
- [ ] Test with screen reader (NVDA on Windows)
- [ ] Verify sufficient color contrast
- [ ] Verify all images have alt text
- [ ] Verify form labels (if any forms added)

### Phase 7: Cross-Browser Testing

**Browsers to Test** (via Playwright):

- [ ] Chromium (latest)
- [ ] Firefox (latest)
- [ ] WebKit (Safari)
- [ ] Mobile Chrome (Pixel 5)
- [ ] Mobile Safari (iPhone 12)

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
npx playwright test --project="Mobile Chrome"
npx playwright test --project="Mobile Safari"
```

### Phase 8: Vercel Configuration

#### Step 8.1: Create Vercel Configuration

**File**: `vercel.json`

```json
{
    "framework": "nextjs",
    "buildCommand": "npm run build",
    "devCommand": "npm run dev",
    "installCommand": "npm install"
}
```

#### Step 8.2: Environment Variables Documentation

**Update** `.env.example`:

```env
# Google Maps API Key (required for map integration)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key-here
```

**Create** `DEPLOYMENT.md`:

````markdown
# Deployment Instructions

## Vercel Setup

1. Connect GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard:
    - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Google Maps API key

## Build Verification

Before deploying:

```bash
npm run build
npm run start
# Test at http://localhost:3000
```
````

## Post-Deployment Verification

After deploying:

- [ ] All pages load correctly
- [ ] Google Maps displays
- [ ] All counselor profiles accessible
- [ ] All newsletter PDFs downloadable
- [ ] Navigation works
- [ ] Mobile responsive

````

### Phase 9: Performance Optimization

#### Step 9.1: Update Next.js Config

**File**: `next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['@googlemaps/js-api-loader'],
  },
  // Enable static export if no server features needed
  // output: 'export',
}

module.exports = nextConfig
````

#### Step 9.2: Verify Static Generation

```bash
npm run build

# Check .next/server/app for static HTML
Get-ChildItem .next\server\app -Recurse -Include "*.html"
```

### Phase 10: Final Pre-Launch Checklist

#### Step 10.1: Code Quality Verification

```bash
# TypeScript
tsc --noEmit

# ESLint
npm run lint

# Prettier
npm run format:check

# All tests
npm run test
npm run e2e
```

#### Step 10.2: Data Integrity Verification

- [ ] All 11 counselors display correctly
- [ ] All 24 newsletters display correctly
- [ ] All counselor fields populated
- [ ] All newsletter PDF links work
- [ ] Contact information accurate
- [ ] Office location correct on map

#### Step 10.3: Manual Visual Comparison

**Side-by-side comparison**:

1. Open Angular app: http://localhost:4200 (or test.compasslex.com)
2. Open Next.js app: http://localhost:3000
3. Compare visually:
    - [ ] Homepage matches
    - [ ] Meet Us page matches
    - [ ] Counselor detail pages match
    - [ ] Newsletters page matches
    - [ ] All other pages match
    - [ ] Colors match
    - [ ] Fonts match
    - [ ] Spacing matches

#### Step 10.4: Final Checklist

- [ ] All pages implemented and tested
- [ ] All tests passing (unit, integration, E2E)
- [ ] Visual regression tests pass
- [ ] Performance targets met (Lighthouse >90)
- [ ] Accessibility targets met (WCAG AA)
- [ ] SEO metadata complete
- [ ] Browser compatibility verified (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsiveness verified
- [ ] Google Maps integration working
- [ ] All assets loading correctly
- [ ] 404 page implemented
- [ ] No console errors in production build
- [ ] Build completes successfully
- [ ] Bundle size within targets
- [ ] Test coverage >75%

## Files to Create/Modify

- `__tests__/integration/*.test.tsx` - Integration tests
- `e2e/*.spec.ts` - Playwright E2E tests (5+ files)
- `vercel.json` - Vercel configuration
- `next.config.js` - Performance optimizations
- `DEPLOYMENT.md` - Deployment instructions
- `.env.example` - Updated with all env vars

## Testing Requirements

### Test Coverage Targets

- Overall: >75%
- Services: >90%
- Components: >80%
- Pages: >70%

### E2E Test Coverage

- [ ] Homepage flow
- [ ] Navigation flow
- [ ] Counselor listing and detail
- [ ] Newsletter listing
- [ ] Google Maps display
- [ ] All 9 pages accessible
- [ ] Mobile menu works

### Visual Regression Coverage

- [ ] Homepage
- [ ] Meet Us
- [ ] Counselor Detail (sample)
- [ ] Newsletters
- [ ] Contact Us (with map)

## Success Criteria

- [ ] All unit tests pass (>75% coverage)
- [ ] All integration tests pass
- [ ] All E2E tests pass
- [ ] Visual regression tests pass
- [ ] Lighthouse scores >90 (all metrics)
- [ ] Accessibility audit passes (WCAG AA)
- [ ] Cross-browser tests pass (5 browsers)
- [ ] Bundle size within targets (<300KB)
- [ ] All code quality checks pass
- [ ] Build completes successfully
- [ ] Production build runs correctly
- [ ] All 11 counselors verified
- [ ] All 24 newsletters verified
- [ ] Google Maps verified
- [ ] Side-by-side visual comparison complete
- [ ] All pre-launch checklist items complete
- [ ] Vercel configuration complete
- [ ] Documentation updated (DEPLOYMENT.md)
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] No Prettier violations

## Notes

### Testing Philosophy

- **Unit Tests**: Test individual components and functions in isolation
- **Integration Tests**: Test multiple components working together
- **E2E Tests**: Test complete user flows from browser perspective
- **Visual Regression**: Catch unintended visual changes

### Performance Optimization Tips

1. **Images**: Use Next.js `<Image>` component
2. **Fonts**: Use `next/font` for optimal loading
3. **Code Splitting**: Automatic with Next.js App Router
4. **Static Generation**: Enable for all possible pages
5. **Bundle Analysis**: Remove unused dependencies

### Common Issues and Solutions

**Test failures**:

- Check data files are copied correctly
- Verify mocks are configured
- Check async operations are awaited

**Visual regression failures**:

- Regenerate baselines if intentional changes
- Check for dynamic content (dates, random data)
- Verify viewport sizes match

**Performance issues**:

- Analyze bundle size
- Check for large dependencies
- Verify static generation
- Optimize images

### Manual Testing Checklist

**Desktop** (Chrome, Firefox, Edge, Safari):

- [ ] All pages load
- [ ] Navigation works
- [ ] Data displays correctly
- [ ] Maps work
- [ ] Links work

**Mobile** (iOS Safari, Android Chrome):

- [ ] Responsive layout
- [ ] Touch interactions
- [ ] Mobile menu
- [ ] Maps work
- [ ] Performance acceptable

### Next Steps After This Task

1. Request human review of all changes
2. Create pull request with comprehensive description
3. Address any PR feedback
4. Merge to main branch
5. Deploy to Vercel (manual by project owner)
6. Monitor production for errors

---

**Task Created**: 2026-01-21
**Estimated Duration**: 16-24 hours
**Complexity**: High
**Risk Level**: Medium
**Priority**: Critical Path
