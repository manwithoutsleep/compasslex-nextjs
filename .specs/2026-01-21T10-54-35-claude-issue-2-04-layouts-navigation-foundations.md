# 2026-01-21T10-54-35-claude-issue-2-04: Layouts, Navigation & Foundations

## Parent Specification

This is sub-task 04 of the parent specification: `2026-01-21T10-54-35-claude-issue-2.md`
The sub-tasks are coordinated by `2026-01-21T10-54-35-claude-issue-2-00-coordinator.md`

## Objective

Implement the root layout, navigation component (desktop and mobile), and establish the foundational structure for all pages in the Next.js application. This provides the consistent wrapper that all page content will render within.

## Dependencies

**Prerequisites** (must be completed before this task):

- Task 02: Core Infrastructure & Data Layer (data repositories may be used)
- Task 03: Design System & Tailwind (UI components needed)

**Blocks** (tasks that depend on this one):

- Task 05: Page Implementations (requires layout and navigation)
- Task 06: Google Maps Integration (needs layout context)

**Parallel Opportunities**:

- None - This is critical path

## Scope

### In Scope

- Root layout (`app/layout.tsx`) with Roboto font and global structure
- Navigation component (`components/navigation.tsx`) with all 9 route links
- Desktop navigation (horizontal menu)
- Mobile navigation (hamburger menu with toggle)
- Active link highlighting
- Metadata configuration
- Global CSS imports
- TDD for all components

### Out of Scope

- Individual page implementations (Task 05)
- Footer component (not in Angular app)
- Complex navigation features (dropdowns, mega menus)
- User authentication/authorization

## Implementation Requirements

### Step 1: Create Root Layout (TDD)

#### Test File: `__tests__/app/layout.test.tsx`

```typescript
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import RootLayout, { metadata } from '@/app/layout'

describe('RootLayout', () => {
  it('should render children', () => {
    const { container } = render(
      <RootLayout>
        <div data-testid="test-child">Test Content</div>
      </RootLayout>
    )
    expect(container.querySelector('[data-testid="test-child"]')).toBeInTheDocument()
  })

  it('should include correct metadata', () => {
    expect(metadata.title).toContain('Compass Christian Counseling')
    expect(metadata.description).toBeDefined()
  })

  it('should apply Roboto font class', () => {
    const { container } = render(<RootLayout><div>Test</div></RootLayout>)
    const html = container.querySelector('html')
    expect(html?.className).toBeTruthy()
  })
})
```

#### Implementation: `app/layout.tsx`

```typescript
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/navigation'

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Compass Christian Counseling - Lexington, KY',
  description: 'Professional Christian counseling services in Lexington, Kentucky',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.className}>
      <body className="bg-pure-white min-h-screen">
        <Navigation />
        <main className="max-w-site mx-auto px-4">{children}</main>
      </body>
    </html>
  )
}
```

### Step 2: Create Navigation Component (TDD)

#### Test File: `__tests__/components/navigation.test.tsx`

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Navigation from '@/components/navigation'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Navigation', () => {
  it('should render all 9 navigation links', () => {
    render(<Navigation />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Meet Us')).toBeInTheDocument()
    expect(screen.getByText('Our Services')).toBeInTheDocument()
    expect(screen.getByText('FAQ')).toBeInTheDocument()
    expect(screen.getByText('Getting Started')).toBeInTheDocument()
    expect(screen.getByText('Resources')).toBeInTheDocument()
    expect(screen.getByText('Contact Us')).toBeInTheDocument()
    expect(screen.getByText('Newsletters')).toBeInTheDocument()
  })

  it('should have correct href attributes', () => {
    render(<Navigation />)
    const homeLink = screen.getByText('Home').closest('a')
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('should toggle mobile menu on button click', async () => {
    render(<Navigation />)
    const user = userEvent.setup()
    const menuButton = screen.getByRole('button', { name: /menu/i })
    await user.click(menuButton)
    // Mobile menu should be visible after click
  })
})
```

#### Implementation: `components/navigation.tsx`

```typescript
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/meet-us', label: 'Meet Us' },
  { href: '/our-services', label: 'Our Services' },
  { href: '/faq', label: 'FAQ' },
  { href: '/getting-started', label: 'Getting Started' },
  { href: '/resources', label: 'Resources' },
  { href: '/contact-us', label: 'Contact Us' },
  { href: '/newsletters', label: 'Newsletters' },
] as const

export default function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-deep-sapphire text-polar-mist">
      <div className="max-w-site mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-warm-sand transition-colors ${
                pathname === link.href ? 'font-bold text-warm-sand' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden py-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-polar-mist hover:text-warm-sand"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? '✕ Close' : '☰ Menu'}
          </button>
          {mobileMenuOpen && (
            <div className="flex flex-col space-y-2 mt-4 pb-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`hover:text-warm-sand transition-colors ${
                    pathname === link.href ? 'font-bold text-warm-sand' : ''
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
```

### Step 3: Update Global Styles (if needed)

Verify `app/globals.css` imports Tailwind directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Files to Create/Modify

- `app/layout.tsx` - Root layout with Roboto font and metadata
- `components/navigation.tsx` - Navigation component (desktop + mobile)
- `app/globals.css` - Verify Tailwind imports (likely already exists)
- `__tests__/app/layout.test.tsx` - Tests for root layout
- `__tests__/components/navigation.test.tsx` - Tests for navigation

## Testing Requirements

- [ ] Root layout renders children correctly
- [ ] Metadata is configured properly
- [ ] Roboto font is applied
- [ ] All 9 navigation links render
- [ ] Active link highlighting works
- [ ] Mobile menu toggles correctly
- [ ] Navigation is responsive (desktop/mobile)

## Success Criteria

- [ ] `app/layout.tsx` created with complete implementation
- [ ] `components/navigation.tsx` created with desktop and mobile views
- [ ] All layout tests pass
- [ ] All navigation tests pass
- [ ] TypeScript compilation succeeds
- [ ] ESLint passes
- [ ] Prettier formatting applied
- [ ] Build completes successfully
- [ ] Dev server runs and navigation is visible
- [ ] Manual test: Navigation works on desktop
- [ ] Manual test: Mobile menu toggles correctly
- [ ] Manual test: Active link highlights correctly
- [ ] Navigation matches Angular styling

## Notes

### Responsive Breakpoints

- Mobile: < 768px (use hamburger menu)
- Desktop: ≥ 768px (use horizontal menu)

### Accessibility

- Use semantic HTML (nav, button)
- Include aria-label for mobile menu button
- Ensure keyboard navigation works

---

**Task Created**: 2026-01-21
**Estimated Duration**: 6-8 hours
**Complexity**: Medium
**Risk Level**: Low
