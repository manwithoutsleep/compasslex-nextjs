---
argument-hint: [focus-area]
allowed-tools: Skill(verify-code)
description: Address a style discrepancy that came up while migrating the original Angular app to the new NextJS app
---

# Address a Style Discrepancy

## Objective

Address the specific style discrepancy mentioned by the user in order to achieve pixel-perfect visual match as we migrate the original Angular app to this new NextJS app.

## Instructions

- Review the [focus-area] described by the user
- Review any supplied screen shots
- Review the specified files in the original Angular app
- Develop a plan for creating a pixel-perfect visual match between the original Angular app and the NextJS component
- Implement that plan
- Request human review: DO NOT PROCEED UNTIL HUMAN APPROVAL OF CHANGES
- Commit the changes to the current branch

## Reference Implementation - Angular Site Comparison

**CRITICAL**: The goal of this project is a pixel-perfect visual match of the Compass Christian Counseling website as we migrate from the original Angular app to this new NextJS app. You MUST verify all styling, behavior, and content against the original Angular site at `../compasslex.com/` as we proceed.

### Repository Context

This migration uses a **separate repository approach**:

- **Angular repo** (`../compasslex.com/`): READ-ONLY reference - the source of truth for all visual styling and behavior
- **Next.js repo** (`compasslex-nextjs/`): ACTIVE working directory - where you write all new code

### Before Implementing Each Page

1. **Review styling discrepancy described by user** inspecting supplied screenshots if available.
2. **Inspect the Angular source code** for exact styling details:
   - Component HTML: `../compasslex.com/src/app/[component]/[component].component.html`
   - Component styles: `../compasslex.com/src/app/[component]/[component].component.scss`
   - Component logic: `../compasslex.com/src/app/[component]/[component].component.ts`
3. **Document specific styling values**:
   - Colors (check against SCSS variables in `../compasslex.com/src/sass/_variables.scss`)
   - Font sizes
   - Spacing (margins, padding, gaps)
   - Responsive breakpoints
   - Animations and transitions
   - Layout structures
4. **Compare your implementation** against the original frequently

### Key Angular Reference Files

- **Global Styles**: `../compasslex.com/src/sass/_variables.scss`
- **Page Routes**: `../compasslex.com/src/app/app-routing.module.ts`
- **Home Page**: `../compasslex.com/src/app/home/`
- **Meet Us (Counselor Listing)**: `../compasslex.com/src/app/counselor-list/`
- **Counselor Detail**: `../compasslex.com/src/app/counselor-detail/`
- **Newsletters**: `../compasslex.com/src/app/newsletter/`
- **Other Pages**: `../compasslex.com/src/app/[page-name]/`

## Verification Procedure

After implementation, use the verify-code skill to ensure TypeScript, linting, formatting, and testing issues are identified and resolved. This ensures code quality and prevents accumulation of technical debt.
