# 2026-01-21T10-54-35-claude-issue-2-04b: Header & Footer Components

## Parent Specification

This is sub-task 04b of the parent specification: `2026-01-21T10-54-35-claude-issue-2.md`
The sub-tasks are coordinated by `2026-01-21T10-54-35-claude-issue-2-00-coordinator.md`

## Objective

Implement the header component (with logo, contact info, and branding) and footer component (with address, building image, and map placeholder) to complete the foundational layout structure. Update the mobile navigation to use an overlay sidenav approach matching the Angular implementation.

## Dependencies

**Prerequisites** (must be completed before this task):

- Task 04: Layouts, Navigation & Foundations (navigation links implemented)

**Blocks** (tasks that depend on this one):

- Task 05: Page Implementations (requires complete header/footer structure)

**Parallel Opportunities**:

- None - This is critical path between Task 04 and Task 05

## Scope

### In Scope

**Header Component**:

- Desktop header with logo and branding images
- Desktop contact info: phone number and "Make an Appointment" button
- Mobile header with fixed positioning (60px height)
- Mobile header with hamburger menu, logo, and icon
- Proper z-index layering for fixed positioning

**Mobile Navigation Updates**:

- Convert current inline mobile menu to slide-out overlay (sidenav)
- Sidenav slides in from left (155px wide)
- Dark backdrop overlay (rgba(0,0,0,0.6))
- Positioned below fixed header on mobile
- Slide animation (transform + transition)

**Footer Component**:

- Address and contact information
- Building image
- Map placeholder (actual Google Maps in Task 06)
- Background horizon image (desktop only)
- Responsive layout

**Assets to Copy**:

- CompassLogoAndIcon.png (desktop header)
- CompassLogoSmall.png (mobile header)
- CompassIconSmall.png (mobile header)
- contactus-building_267x160.jpg (footer)
- footer-horizon.jpg (footer background)

**Styling Requirements**:

- Match Angular styling exactly from `navigation.component.scss`
- Elevated header shadow
- Responsive breakpoints matching Angular ($app-width-small-screen)
- Fixed header behavior on mobile
- Footer background image positioning

### Out of Scope

- Google Maps integration (Task 06)
- Form functionality
- User authentication
- Search functionality

## Environment Notes

This project is developed in a **WSL (Windows Subsystem for Linux)** environment where all standard Unix commands and npm commands work natively without any special syntax.

## Reference Implementation - Angular Site

**CRITICAL**: Reference the Angular site at `../compasslex.com/` for exact styling and behavior.

### Key Angular Reference Files

- **Navigation Component HTML**: `../compasslex.com/src/app/components/navigation/navigation.component.html`
- **Navigation Component Styles**: `../compasslex.com/src/app/components/navigation/navigation.component.scss`
- **Navigation Component Logic**: `../compasslex.com/src/app/components/navigation/navigation.component.ts`
- **SCSS Variables**: `../compasslex.com/src/sass/_variables.scss`
- **Assets**: `../compasslex.com/src/assets/site-images/`

### Angular Implementation Details

**Desktop Header** (lines 18-42):

```html
<div class="navigation-header-large-screen">
  <h1>
    <a routerLink="/"><img src="/assets/site-images/CompassLogoAndIcon.png" /></a>
  </h1>
  <div class="navigation-header-right">
    <div class="navigation-contact-info">
      <div>(859) 721-3259</div>
      <button class="navigation-appointment-button" routerLink="/contact-us">
        Make an Appointment
      </button>
    </div>
    <div class="navigation-top-menu">
      <!-- Navigation buttons here (already implemented in Phase 4) -->
    </div>
  </div>
</div>
```

**Mobile Header** (lines 3-17):

```html
<h1 class="navigation-header-small-screen">
  <button (click)="toggleSidenav()" class="menu-button icon-button">
    <span class="material-icons">menu</span>
  </button>
  <a routerLink="/"><img src="/assets/site-images/CompassLogoSmall.png" /></a>
  <a routerLink="/"><img src="/assets/site-images/CompassIconSmall.png" /></a>
</h1>
```

**Mobile Sidenav** (lines 196-222 in SCSS):

- Fixed positioning
- 155px wide
- Slides in from left with `transform: translateX(-100%)` to `translateX(0)`
- Positioned below header: `top: 60px`
- Height: `calc(100vh - 60px)`
- Z-index: 1100 (backdrop: 1050, header: 1250)

**Footer** (lines 78-91):

```html
<footer class="navigation-footer">
  <div class="navigation-footer-address">
    <div class="address">
      Compass Christian Counseling<br />
      651 Perimeter Drive, Suite 115<br />
      Lexington, KY 40517<br />
      (859) 721-3259<br />
    </div>
    <img src="/assets/site-images/contactus-building_267x160.jpg" alt="building" />
  </div>
  <div class="navigation-footer-map">
    <!-- Map placeholder for now, actual map in Task 06 -->
  </div>
</footer>
```

## Implementation Requirements

### Architecture Decisions

**Component Structure**:

- Create `components/header.tsx` for header component
- Create `components/footer.tsx` for footer component
- Update `components/navigation.tsx` to integrate with header and use sidenav on mobile
- Update `app/layout.tsx` to use Header and Footer components

**State Management**:

- Mobile menu state managed in Header component
- Pass menu state to Navigation component for sidenav coordination

**Responsive Strategy**:

- Desktop breakpoint: `min-width: 600px` (matching Angular's $app-width-small-screen)
- Mobile: `max-width: 599px`
- Use Tailwind's responsive prefixes: `min-[600px]:` for desktop

## Implementation Steps

### Step 0: Create Git Branch

```bash
git checkout nextjs-migration-phase-4
# Continue working on same branch as Phase 4
```

### Step 1: Copy Asset Files

Copy required images from Angular repo to Next.js repo:

```bash
cp ../compasslex.com/src/assets/site-images/CompassLogoAndIcon.png public/assets/site-images/
cp ../compasslex.com/src/assets/site-images/CompassLogoSmall.png public/assets/site-images/
cp ../compasslex.com/src/assets/site-images/CompassIconSmall.png public/assets/site-images/
cp ../compasslex.com/src/assets/site-images/contactus-building_267x160.jpg public/assets/site-images/
cp ../compasslex.com/src/assets/site-images/footer-horizon.jpg public/assets/site-images/
```

Verify files copied successfully.

### Step 2: Create Header Component (TDD)

#### Test File: `__tests__/components/header.test.tsx`

```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from '@/components/header'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Header', () => {
  describe('Desktop Header', () => {
    it('should render logo image', () => {
      render(<Header />)
      const logo = screen.getByAltText(/compass christian counseling/i)
      expect(logo).toBeInTheDocument()
    })

    it('should render phone number', () => {
      render(<Header />)
      expect(screen.getByText('(859) 721-3259')).toBeInTheDocument()
    })

    it('should render Make an Appointment button', () => {
      render(<Header />)
      const button = screen.getByRole('link', { name: /make an appointment/i })
      expect(button).toHaveAttribute('href', '/contact-us')
    })
  })

  describe('Mobile Header', () => {
    it('should render menu button', () => {
      render(<Header />)
      const menuButton = screen.getByLabelText(/toggle menu/i)
      expect(menuButton).toBeInTheDocument()
    })

    it('should toggle mobile menu on button click', async () => {
      render(<Header />)
      const user = userEvent.setup()
      const menuButton = screen.getByLabelText(/toggle menu/i)

      // Menu should be closed initially
      expect(menuButton).toHaveTextContent('☰')

      // Click to open
      await user.click(menuButton)
      expect(menuButton).toHaveTextContent('✕')
    })
  })
})
```

#### Implementation: `components/header.tsx`

```typescript
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import Navigation from '@/components/navigation'

/**
 * Header component with desktop and mobile layouts
 *
 * Desktop features:
 * - Logo and branding
 * - Phone number
 * - "Make an Appointment" button
 * - Navigation menu (horizontal)
 *
 * Mobile features:
 * - Fixed header bar (60px height)
 * - Hamburger menu button
 * - Logo and icon
 * - Navigation sidenav (slide-out overlay)
 */
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="bg-pure-white shadow-[0_2px_4px_-1px_rgba(0,0,0,0.2),0_4px_5px_0_rgba(0,0,0,0.14),0_1px_10px_0_rgba(0,0,0,0.12)] z-[1200] max-w-site mx-auto w-full min-[600px]:relative fixed min-[600px]:h-auto h-[60px]">
        {/* Mobile Header - Fixed at top */}
        <div className="min-[600px]:hidden flex flex-row justify-between items-center h-[60px] px-2 m-0">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-transparent border-none cursor-pointer hover:bg-black/[0.04] transition-colors"
            aria-label="Toggle menu"
          >
            <span className="text-2xl">{mobileMenuOpen ? '✕' : '☰'}</span>
          </button>
          <Link href="/" className="flex">
            <Image
              src="/assets/site-images/CompassLogoSmall.png"
              alt="Compass Christian Counseling"
              width={200}
              height={40}
              priority
            />
          </Link>
          <Link href="/" className="flex">
            <Image
              src="/assets/site-images/CompassIconSmall.png"
              alt="Compass Christian Counseling"
              width={40}
              height={40}
              priority
            />
          </Link>
        </div>

        {/* Desktop Header */}
        <div className="hidden min-[600px]:flex flex-row justify-between p-3">
          <h1 className="flex items-center bg-transparent m-0">
            <Link href="/" className="flex bg-transparent border-0 m-0 p-0 text-[0em]">
              <Image
                src="/assets/site-images/CompassLogoAndIcon.png"
                alt="Compass Christian Counseling"
                width={300}
                height={80}
                priority
              />
            </Link>
          </h1>
          <div className="flex flex-col flex-grow-[4]">
            {/* Contact Info */}
            <div className="flex flex-row flex-wrap justify-around text-[1.3em] leading-[50px] px-8 text-center">
              <div>(859) 721-3259</div>
              <Link
                href="/contact-us"
                className="bg-deep-sapphire text-polar-mist cursor-pointer px-4 no-underline hover:opacity-90 transition-opacity"
              >
                Make an Appointment
              </Link>
            </div>
            {/* Navigation Menu - Desktop */}
            <Navigation isMobile={false} />
          </div>
        </div>
      </header>

      {/* Mobile Navigation Sidenav */}
      <Navigation isMobile={true} isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  )
}
```

### Step 3: Update Navigation Component for Sidenav

Update `components/navigation.tsx` to support both desktop (in header) and mobile (sidenav overlay) modes:

#### Updated Implementation: `components/navigation.tsx`

```typescript
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Navigation link configuration
 */
const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/meet-us', label: 'Meet Us' },
  { href: '/our-services', label: 'Our Services' },
  { href: '/faq', label: 'FAQ' },
  { href: '/getting-started', label: 'Getting Started' },
  { href: '/resources', label: 'Resources' },
  { href: '/contact-us', label: 'Contact Us' },
] as const

interface NavigationProps {
  isMobile: boolean
  isOpen?: boolean
  onClose?: () => void
}

/**
 * Navigation component with responsive desktop and mobile layouts
 *
 * Desktop mode (isMobile=false):
 * - Rendered within header component
 * - Horizontal navigation menu
 *
 * Mobile mode (isMobile=true):
 * - Slide-out sidenav overlay from left
 * - Dark backdrop
 * - Positioned below fixed header
 */
export default function Navigation({ isMobile, isOpen = false, onClose }: NavigationProps) {
  const pathname = usePathname()

  // Close sidenav on route change
  useEffect(() => {
    if (isMobile && isOpen && onClose) {
      onClose()
    }
  }, [pathname, isMobile, isOpen, onClose])

  // Desktop Navigation
  if (!isMobile) {
    return (
      <nav className="hidden min-[600px]:flex flex-row flex-wrap justify-around items-end h-[75px] p-[9px_0] font-bold">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-deep-sapphire text-[1.3em] whitespace-nowrap px-1 transition-all duration-300 ease-in-out hover:cursor-pointer hover:[text-shadow:white_0_0_3px,#aaaaff_0_0_5px,#191248_0_0_25px] ${
              pathname === link.href ? 'font-bold' : 'font-normal'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    )
  }

  // Mobile Navigation - Sidenav Overlay
  return (
    <>
      {/* Backdrop */}
      <div
        className={`min-[600px]:hidden fixed top-0 left-0 w-screen h-screen bg-black/60 z-[1050] transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />

      {/* Sidenav */}
      <nav
        className={`min-[600px]:hidden fixed left-0 top-[60px] h-[calc(100vh-60px)] w-[155px] bg-pure-white z-[1100] shadow-[0_8px_10px_-5px_rgba(0,0,0,0.2),0_16px_24px_2px_rgba(0,0,0,0.14),0_6px_30px_5px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="pt-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-deep-sapphire box-border flex flex-row h-12 leading-5 px-4 py-3.5 text-left text-[1.3em] font-bold no-underline hover:bg-black/[0.04] transition-colors"
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  )
}
```

### Step 4: Create Footer Component (TDD)

#### Test File: `__tests__/components/footer.test.tsx`

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '@/components/footer'

describe('Footer', () => {
  it('should render address information', () => {
    render(<Footer />)
    expect(screen.getByText(/Compass Christian Counseling/i)).toBeInTheDocument()
    expect(screen.getByText(/651 Perimeter Drive, Suite 115/i)).toBeInTheDocument()
    expect(screen.getByText(/Lexington, KY 40517/i)).toBeInTheDocument()
    expect(screen.getByText(/\(859\) 721-3259/i)).toBeInTheDocument()
  })

  it('should render building image', () => {
    render(<Footer />)
    const image = screen.getByAltText(/building/i)
    expect(image).toBeInTheDocument()
  })

  it('should render map placeholder', () => {
    render(<Footer />)
    expect(screen.getByText(/Map will be integrated in Task 06/i)).toBeInTheDocument()
  })
})
```

#### Implementation: `components/footer.tsx`

```typescript
import Image from 'next/image'

/**
 * Footer component with address, building image, and map
 *
 * Features:
 * - Address and contact information
 * - Building image
 * - Map placeholder (actual Google Maps in Task 06)
 * - Background horizon image (desktop only)
 * - Responsive layout
 */
export default function Footer() {
  return (
    <footer className="flex flex-row flex-wrap justify-evenly items-center m-auto p-[0_0_16px_0] w-full min-[600px]:bg-[url('/assets/site-images/footer-horizon.jpg')] min-[600px]:bg-[length:contain] min-[600px]:bg-bottom min-[600px]:bg-no-repeat">
      {/* Address Section */}
      <div className="flex flex-col mb-1">
        <div className="text-[1.1em] leading-[30px]">
          Compass Christian Counseling<br />
          651 Perimeter Drive, Suite 115<br />
          Lexington, KY 40517<br />
          (859) 721-3259<br />
        </div>
        <Image
          src="/assets/site-images/contactus-building_267x160.jpg"
          alt="building"
          width={267}
          height={160}
        />
      </div>

      {/* Map Section - Placeholder */}
      <div className="flex flex-col items-center w-full min-[600px]:w-full min-[600px]:max-w-[465px]">
        <div className="bg-gray-200 w-full h-[300px] flex items-center justify-center text-gray-600">
          Map will be integrated in Task 06
        </div>
      </div>
    </footer>
  )
}
```

### Step 5: Update Root Layout

Update `app/layout.tsx` to use Header and Footer components instead of Navigation directly:

```typescript
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Compass Christian Counseling - Lexington, KY',
  description: 'Professional Christian counseling services in Lexington, Kentucky',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body className="bg-pure-white min-h-screen">
        <Header />
        {/* Add top margin on mobile to account for fixed header */}
        <main className="max-w-site mx-auto px-4 min-[600px]:mt-0 mt-[60px]">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

### Step 6: Update Navigation Tests

Update `__tests__/components/navigation.test.tsx` to account for new props:

```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Navigation from '@/components/navigation'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Navigation', () => {
  describe('Desktop Navigation', () => {
    it('should render all navigation links', () => {
      render(<Navigation isMobile={false} />)
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('Meet Us')).toBeInTheDocument()
      expect(screen.getByText('Our Services')).toBeInTheDocument()
      expect(screen.getByText('FAQ')).toBeInTheDocument()
      expect(screen.getByText('Getting Started')).toBeInTheDocument()
      expect(screen.getByText('Resources')).toBeInTheDocument()
      expect(screen.getByText('Contact Us')).toBeInTheDocument()
    })
  })

  describe('Mobile Navigation', () => {
    it('should render sidenav when open', () => {
      render(<Navigation isMobile={true} isOpen={true} onClose={() => {}} />)
      const links = screen.getAllByRole('link')
      expect(links.length).toBe(7)
    })

    it('should be hidden when closed', () => {
      const { container } = render(<Navigation isMobile={true} isOpen={false} onClose={() => {}} />)
      const sidenav = container.querySelector('nav')
      expect(sidenav).toHaveClass('-translate-x-full')
    })
  })
})
```

## Files to Create/Modify

**New Files**:

- `components/header.tsx` - Header component
- `components/footer.tsx` - Footer component
- `__tests__/components/header.test.tsx` - Header tests
- `__tests__/components/footer.test.tsx` - Footer tests

**Modified Files**:

- `components/navigation.tsx` - Updated for sidenav overlay
- `__tests__/components/navigation.test.tsx` - Updated tests
- `app/layout.tsx` - Use Header and Footer instead of Navigation

**Assets to Copy**:

- `public/assets/site-images/CompassLogoAndIcon.png`
- `public/assets/site-images/CompassLogoSmall.png`
- `public/assets/site-images/CompassIconSmall.png`
- `public/assets/site-images/contactus-building_267x160.jpg`
- `public/assets/site-images/footer-horizon.jpg`

## Testing Requirements

### Unit Tests

- [ ] Header renders desktop logo
- [ ] Header renders phone number
- [ ] Header renders "Make an Appointment" button
- [ ] Header renders mobile menu button
- [ ] Mobile menu toggles on button click
- [ ] Footer renders address
- [ ] Footer renders building image
- [ ] Footer renders map placeholder
- [ ] Navigation renders desktop links
- [ ] Navigation renders mobile sidenav
- [ ] Sidenav slides in/out correctly
- [ ] Backdrop appears/disappears with sidenav

### Visual Testing

- [ ] Desktop header matches Angular styling
- [ ] Mobile header matches Angular styling
- [ ] Sidenav overlay matches Angular behavior
- [ ] Footer matches Angular styling
- [ ] Fixed header stays at top on mobile scroll
- [ ] Content has correct top margin on mobile
- [ ] Logo images display correctly
- [ ] Building image displays correctly

### Responsive Testing

- [ ] Header switches between desktop/mobile at 600px breakpoint
- [ ] Navigation switches between horizontal/sidenav at 600px
- [ ] Footer background image only shows on desktop
- [ ] All components responsive on mobile/tablet/desktop

## Success Criteria

- [ ] Header component created with tests
- [ ] Footer component created with tests
- [ ] Navigation updated to support sidenav overlay
- [ ] All component tests pass (target: 10+ tests total)
- [ ] All logo images copied and display correctly
- [ ] Mobile header fixed positioning works
- [ ] Sidenav slides in/out smoothly
- [ ] Backdrop appears/disappears correctly
- [ ] Desktop header layout matches Angular
- [ ] Footer layout matches Angular
- [ ] TypeScript compilation succeeds
- [ ] ESLint passes
- [ ] Prettier formatting applied
- [ ] Build completes successfully
- [ ] Visual match to Angular site (side-by-side comparison)
- [ ] No layout shifts or visual glitches
- [ ] Z-index layering correct (header > sidenav > backdrop)

## Notes

### Z-Index Hierarchy

Following Angular implementation:

- Header (mobile): `z-index: 1250`
- Sidenav: `z-index: 1100`
- Backdrop: `z-index: 1050`

### Fixed Header on Mobile

Mobile header is `position: fixed` to stay at top during scroll. Content needs `margin-top: 60px` to avoid being covered by header.

### Image Optimization

Use Next.js `<Image>` component for:

- Automatic optimization
- Lazy loading
- Proper sizing
- Priority loading for above-fold images

### Responsive Breakpoint

Angular uses `$app-width-small-screen` which appears to be 600px based on the implementation. Use Tailwind's `min-[600px]:` for consistency.

### Material Icons

Angular uses Material Icons for the hamburger menu (`<span class="material-icons">menu</span>`). For Next.js, we'll use simple text symbols (☰ and ✕) to avoid adding Material Icons dependency.

### Footer Map Integration

Footer has a placeholder for Google Maps. Task 06 will integrate the actual map component into this space.

---

**Task Created**: 2026-02-09
**Estimated Duration**: 6-8 hours
**Complexity**: Medium
**Risk Level**: Low
**Branch**: `nextjs-migration-phase-4` (continue from Phase 4)
