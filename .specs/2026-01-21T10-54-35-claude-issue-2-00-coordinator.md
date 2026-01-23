# 2026-01-21T10-54-35-claude-issue-2 - Coordinator Plan

## Overview

This coordinator plan manages the execution of sub-tasks for the parent specification: `2026-01-21T10-54-35-claude-issue-2.md` - Next.js Migration with Tailwind CSS.

**Total Sub-Tasks**: 7
**Estimated Total Effort**: 80-120 hours
**Parallelization Potential**: Medium

## Sub-Task Index

| Task | File                           | Status  | Dependencies | Can Run In Parallel With |
| ---- | ------------------------------ | ------- | ------------ | ------------------------ |
| 01   | development-environment-setup  | Pending | None         | None                     |
| 02   | core-infrastructure-data-layer | Pending | 01           | None                     |
| 03   | design-system-tailwind         | Pending | 01           | 02                       |
| 04   | layouts-navigation-foundations | Pending | 02, 03       | None                     |
| 05   | page-implementations           | Pending | 04           | None                     |
| 06   | google-maps-integration        | Pending | 04           | 05                       |
| 07   | testing-qa-deployment          | Pending | 05, 06       | None                     |

## Execution Strategy

### Phase 1: Foundation Setup (Sequential - 1 task)

**Task 01: Development Environment Setup**

- Install dependencies (Vitest, Playwright, Prettier, Google Maps loader)
- Configure environment variables
- Set up testing infrastructure
- Verify build pipeline

**Estimated Duration**: 2-3 hours

**Wait for Phase 1 completion before proceeding to Phase 2**

---

### Phase 2: Core Infrastructure (2 tasks - Can partially overlap)

**Task 02: Core Infrastructure & Data Layer** (Priority 1)

- TypeScript interfaces for Counselor and Newsletter
- Data repository layer with interfaces
- Copy data files and assets from Angular repo
- TDD approach with comprehensive tests

**Task 03: Design System & Tailwind** (Can start after Task 01, parallel with 02)

- Configure Tailwind theme with color palette
- Create reusable UI components (Card, Button, Heading)
- TDD approach for all components

**Estimated Duration**: 8-12 hours (combined)

**Note**: Task 03 can start as soon as Task 01 is complete. Task 02 is critical path.

**Wait for both Tasks 02 and 03 before proceeding to Phase 3**

---

### Phase 3: Layout & Navigation (1 task)

**Task 04: Layouts, Navigation & Foundations**

- Root layout with Roboto font
- Navigation component (desktop + mobile)
- App router configuration
- TDD approach

**Estimated Duration**: 6-8 hours

**Wait for Phase 3 completion before proceeding to Phase 4**

---

### Phase 4: Page Implementation & Integration (2 tasks - Partial overlap)

**Task 05: Page Implementations** (Priority 1 - Critical Path)

- All 9 pages: home, meet-us, counselor detail, newsletters, our-services, faq, getting-started, resources, contact-us
- Counselor and Newsletter components
- Dynamic routing for counselor detail pages
- TDD approach for each page

**Task 06: Google Maps Integration** (Can start after Task 04, parallel with Task 05)

- Google Maps component with loader
- Client component implementation
- Map marker and configuration
- TDD approach

**Estimated Duration**: 24-36 hours (combined)

**Note**: Task 06 can run mostly in parallel with Task 05. Task 05 is on critical path.

**Wait for both Tasks 05 and 06 before proceeding to Phase 5**

---

### Phase 5: Testing, QA & Deployment (1 task)

**Task 07: Testing, QA & Deployment Preparation**

- Comprehensive unit test coverage (>75% overall)
- Integration testing
- E2E testing with Playwright
- Visual regression testing
- Vercel configuration
- Performance optimization
- SEO metadata
- Final pre-launch checklist

**Estimated Duration**: 16-24 hours

**This is the final task before PR creation**

---

## Dependency Graph

```
01 (env-setup)
 ├─→ 02 (data-layer) ─────┐
 └─→ 03 (design-system) ──┼─→ 04 (layouts-nav) ──┐
                          │                       ├─→ 05 (pages) ──┐
                          │                       └─→ 06 (maps) ───┼─→ 07 (testing-qa)
                          │                                          │
                          └──────────────────────────────────────────┘
```

## Critical Path

The longest sequence of dependent tasks (determines minimum completion time):

**01 → 02 → 04 → 05 → 07**

**Estimated Critical Path Duration**: 56-83 hours

## Coordination Notes

### Conflict Prevention

**Potential Conflicts**:

1. **Tasks 02 & 03**: Low conflict risk
    - Task 02: Works in `types/`, `services/`, `public/data/`, `__tests__/types/`, `__tests__/services/`
    - Task 03: Works in `tailwind.config.ts`, `components/ui/`, `__tests__/components/ui/`, `__tests__/styles/`
    - **Mitigation**: No file overlap, can run in parallel

2. **Tasks 05 & 06**: Low-Medium conflict risk
    - Task 05: Works in `app/*/page.tsx`, `components/counselor-*`, `components/newsletter-*`
    - Task 06: Works in `components/google-map.tsx`, `__tests__/components/google-map.test.tsx`
    - **Mitigation**: Minimal file overlap. Task 06 may need to integrate into Task 05's contact-us page, so coordination needed at integration point

3. **Vitest Configuration**: All tasks with tests
    - Multiple tasks create test files
    - **Mitigation**: Task 01 sets up Vitest configuration. All subsequent tasks follow established patterns

### Recommended Execution Order

If executing sequentially (not in parallel), follow this order for optimal flow:

1. **Task 01** (Development Environment Setup) - Foundation required by all
2. **Task 02** (Core Infrastructure & Data Layer) - Critical for pages
3. **Task 03** (Design System & Tailwind) - Required for all UI components
4. **Task 04** (Layouts, Navigation & Foundations) - Required for pages
5. **Task 05** (Page Implementations) - Core content
6. **Task 06** (Google Maps Integration) - Integration with pages
7. **Task 07** (Testing, QA & Deployment) - Final validation

### Integration Points

**Task 02 → Task 04**: Data repository interfaces used in layout (if needed for dynamic content)

**Task 03 → Task 04**: UI components (Card, Button) used in navigation component

**Task 04 → Task 05**: Root layout and navigation wrap all pages

**Task 02 + Task 05**: CounselorRepository and NewsletterRepository used extensively in pages

**Task 06 → Task 05**: Google Maps component likely integrated into contact-us or home page

**Task 07**: Integrates ALL previous work - comprehensive testing

## Progress Tracking

### Completion Checklist

- [ ] Task 01: Development Environment Setup
- [ ] Task 02: Core Infrastructure & Data Layer
- [ ] Task 03: Design System & Tailwind
- [ ] Task 04: Layouts, Navigation & Foundations
- [ ] Task 05: Page Implementations (9 pages)
- [ ] Task 06: Google Maps Integration
- [ ] Task 07: Testing, QA & Deployment Preparation
- [ ] All sub-tasks completed
- [ ] Integration testing passed
- [ ] Parent specification objectives achieved

## Integration Verification

After all sub-tasks are complete, verify:

- [ ] All sub-task success criteria met
- [ ] All 9 pages render correctly with data from repositories
- [ ] Navigation works across all pages
- [ ] Google Maps displays correctly
- [ ] Tailwind theme applied consistently across all pages
- [ ] All components integrate correctly
- [ ] No conflicts or breaking changes introduced
- [ ] All tests pass (unit + integration + E2E)
- [ ] Code quality standards maintained (TypeScript, ESLint, Prettier)
- [ ] Build completes successfully (`npm run build`)
- [ ] Production build works locally (`npm run start`)
- [ ] Performance targets met (Lighthouse >90)
- [ ] Test coverage goals achieved (>75% overall)
- [ ] Parent specification goals fully achieved

## Rollback Strategy

If a critical issue is discovered:

1. **Identify which sub-task(s) introduced the issue**
    - Use git history to isolate changes by sub-task
    - Review sub-task success criteria that may have been missed

2. **Isolate the problematic changes**
    - Create a separate branch for investigation
    - Identify minimal set of changes causing the issue

3. **Determine fix-forward or rollback**
    - **Fix-forward**: If issue is minor and fixable quickly
    - **Rollback**: If issue is fundamental or blocks progress

4. **Update affected sub-task specifications**
    - Document lessons learned
    - Update success criteria if needed
    - Add additional verification steps

5. **Re-verify integration**
    - Run full integration verification checklist
    - Ensure no downstream impacts

## Special Considerations

### Working Across Repositories

This migration uses a **separate repository approach**:

- **Angular repo** (`../compasslex.com/`): READ-ONLY reference
- **Next.js repo** (`compasslex-nextjs/`): ACTIVE working directory

**All sub-tasks must**:

- Read from Angular repo when needed for reference
- Write all new code to Next.js repo
- Only commit changes to Next.js repo

### PowerShell Environment

All shell commands use **PowerShell syntax** (Windows 11):

- Use `Copy-Item` instead of `cp`
- Use `New-Item` instead of `mkdir`
- npm/npx/git commands work identically

### TDD Discipline

All sub-tasks follow **Test-Driven Development**:

1. **RED**: Write failing test first
2. **GREEN**: Implement minimum code to pass
3. **REFACTOR**: Improve code while keeping tests green

### Verification After Each Task

Every sub-task must run these commands after completion:

```bash
tsc --noEmit
npx eslint --fix {files}
npx prettier --write {files}
npx vitest run {test-files}
```

**Do not proceed to dependent tasks until all verifications pass.**

## Success Criteria - Overall Migration

### Functional Requirements

- ✅ All 11 counselor profiles display correctly
- ✅ All 24 newsletters accessible with PDF downloads
- ✅ All 9 pages functional and match Angular functionality
- ✅ Google Maps displays with marker
- ✅ Mobile navigation menu works
- ✅ Dynamic routing for counselor detail pages

### Technical Requirements

- ✅ 0 TypeScript errors
- ✅ 0 ESLint errors
- ✅ 100% Prettier formatting compliance
- ✅ >75% test coverage overall
- ✅ >90% service layer test coverage
- ✅ Build completes successfully
- ✅ All unit tests pass
- ✅ All integration tests pass
- ✅ All E2E tests pass

### Performance Requirements

- ✅ Lighthouse Performance Score: >90
- ✅ First Contentful Paint: <1.5s
- ✅ Time to Interactive: <3s
- ✅ Cumulative Layout Shift: <0.1

### User Experience Requirements

- ✅ Pixel-perfect visual match to Angular app
- ✅ No console errors in production
- ✅ Passes WCAG AA accessibility audit
- ✅ Works in Chrome, Firefox, Safari, Edge
- ✅ Responsive on mobile, tablet, desktop

---

**Coordinator Created**: 2026-01-21
**Parent Specification**: 2026-01-21T10-54-35-claude-issue-2.md
**Total Sub-Tasks**: 7
**Execution Model**: Sequential with limited parallelization opportunities
**Critical Path Duration**: 56-83 hours
