# 2026-01-21T10-54-35-claude-issue-2-03: Design System & Tailwind Configuration

## Parent Specification

This is sub-task 03 of the parent specification: `2026-01-21T10-54-35-claude-issue-2.md`
The sub-tasks are coordinated by `2026-01-21T10-54-35-claude-issue-2-00-coordinator.md`

## Objective

Configure Tailwind CSS theme to match the existing Angular application's color scheme and typography, then create a foundational set of reusable UI components using Test-Driven Development. This establishes the visual design system for the entire application.

## Dependencies

**Prerequisites** (must be completed before this task):

- Task 01: Development Environment Setup (Tailwind CSS already installed via Next.js boilerplate)

**Blocks** (tasks that depend on this one):

- Task 04: Layouts, Navigation & Foundations (uses UI components)
- Task 05: Page Implementations (uses UI components and Tailwind theme)

**Parallel Opportunities**:

- Task 02: Core Infrastructure & Data Layer (no file overlap, can run simultaneously)

## Scope

### In Scope

- Configure Tailwind CSS theme with custom color palette matching Angular SCSS variables
- Configure typography (Roboto font family)
- Configure custom spacing, sizing, and layout utilities
- Create reusable Card component (Card, CardTitle, CardBody)
- Create reusable Button component with variants
- Create reusable Heading component with size variants
- Write comprehensive unit tests for Tailwind configuration (TDD)
- Write comprehensive unit tests for all UI components (TDD)
- Verify visual match to Angular design

### Out of Scope

- Page-specific components (Task 05)
- Navigation component (Task 04)
- Layout components (Task 04)
- Google Maps component (Task 06)
- Any data fetching or business logic
- Complex interactive components

## Environment Notes

This project is developed in a **WSL (Windows Subsystem for Linux)** environment where all standard Unix commands and npm commands work natively without any special syntax.

## Implementation Requirements

### Technology Stack

- **Tailwind CSS v4** (using CSS-based configuration)
    - **Note**: This spec originally targeted Tailwind v3 with `tailwind.config.ts`, but the implementation intentionally uses Tailwind v4's modern `@theme` directive in CSS for several advantages:
        - Native CSS custom properties integration
        - Simpler configuration without separate JS/TS config file
        - Better alignment with CSS-first approach
        - Forward-compatible with CSS ecosystem
- React 18+ for component implementation
- TypeScript for type safety
- Vitest + React Testing Library for testing

### TDD Approach

Follow strict Test-Driven Development:

1. **RED**: Write failing test for Tailwind configuration
2. **GREEN**: Implement Tailwind configuration
3. **RED**: Write failing tests for each UI component
4. **GREEN**: Implement UI components
5. **REFACTOR**: Extract common patterns

### SOLID Principles Application

**Single Responsibility Principle (SRP)**:

- Each component does one thing (Card displays content in a card, Button triggers actions)

**Open/Closed Principle (OCP)**:

- Components accept `className` prop to extend styling without modification
- Variants can be added without changing base components

**Interface Segregation Principle (ISP)**:

- Minimal, focused prop interfaces for each component

**Liskov Substitution Principle (LSP)**:

- All components follow standard React component interface

## Implementation Decision: Tailwind v4

**Decision**: This implementation uses **Tailwind CSS v4** with CSS-based `@theme` configuration instead of the traditional v3 `tailwind.config.ts` approach.

**Rationale**:

1. **Modern CSS-First Approach**: Tailwind v4 embraces native CSS with `@theme` directive, reducing the need for separate configuration files
2. **CSS Custom Properties**: Direct integration with CSS variables provides better debugging and browser DevTools inspection
3. **Simplified Setup**: No need to maintain separate TypeScript/JavaScript config file
4. **Forward Compatibility**: Aligns with CSS ecosystem evolution and web standards
5. **Type Safety Not Compromised**: TypeScript still provides full type safety for component props and Tailwind class names through IDE extensions

**Trade-offs**:

- Traditional `resolveConfig` tests from `tailwindcss/resolveConfig` don't work with v4's CSS-based config
- Solution: Use browser DevTools for visual verification of theme configuration
- Components remain fully testable with comprehensive unit tests

**Migration Path**: If future requirements necessitate v3 syntax, the CSS theme can be mechanically converted to `tailwind.config.ts` format.

## Implementation Steps

### Step 0: Create Git Branch

Create a git branch for these changes:

```bash
git checkout -b nextjs-migration-phase-3
```

### Step 1: Extract Color Palette from Angular SCSS

Reference the Angular repo to extract color values:

**Read**: `../compasslex.com/src/sass/_variables.scss`

Expected colors:

```scss
// Old site colors (primary palette)
$deep-sapphire: #191248;
$warm-sand: #f2c58a;
$peach-puff: #fbe3c9;
$pure-white: #ffffff;
$royal-indigo: #43208a;

// New site colors
$polar-mist: #ddeff7;
$bengal-blue: #b1cfdd;
$raspberry-smoothie: #c6a3b3;
$north-pole-blue: #709eb4;
$ultra-pure-white: #f8f9f3;
```

### Step 2: Configure Tailwind Theme (Tailwind v4)

**Note**: This implementation uses Tailwind v4's `@theme` directive instead of v3's `tailwind.config.ts`. The configuration tests for v3 have been intentionally omitted as Tailwind v4 uses CSS-based configuration.

#### 2.1: Update Global CSS with Theme Configuration

Update `app/globals.css` with the `@theme` directive:

```css
@import 'tailwindcss';

@theme {
    /* Color Palette - Old Site Colors (Primary) */
    --color-deep-sapphire: #191248;
    --color-warm-sand: #f2c58a;
    --color-peach-puff: #fbe3c9;
    --color-pure-white: #ffffff;
    --color-royal-indigo: #43208a;

    /* Color Palette - New Site Colors */
    --color-polar-mist: #ddeff7;
    --color-bengal-blue: #b1cfdd;
    --color-raspberry-smoothie: #c6a3b3;
    --color-north-pole-blue: #709eb4;
    --color-ultra-pure-white: #f8f9f3;

    /* Layout Configuration */
    --max-width-site: 1440px;
    --min-width-site: 320px;

    /* Border Widths */
    --border-width-3: 3px;

    /* Typography */
    --font-family-sans: Roboto, sans-serif;
}
```

#### 2.2: Configure Roboto Font

Update `app/layout.tsx` to import Roboto font:

```typescript
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>{children}</body>
    </html>
  )
}
```

#### 2.3: Verify Theme Configuration

Manually verify the theme works by checking browser DevTools that:

- Color classes (e.g., `bg-deep-sapphire`) apply correct hex values
- Custom border width `border-3` renders as 3px
- Max/min width classes work correctly
- Roboto font loads and applies

### Step 3: Create Card Component (TDD)

#### 3.1: Create Card Component Test

Create `__tests__/components/ui/card.test.tsx`:

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card, CardTitle, CardBody } from '@/components/ui/card'

describe('Card Component', () => {
  describe('Card', () => {
    it('should render children', () => {
      render(
        <Card>
          <div>Card Content</div>
        </Card>
      )
      expect(screen.getByText('Card Content')).toBeInTheDocument()
    })

    it('should apply base styling classes', () => {
      const { container } = render(<Card><div>Content</div></Card>)
      const card = container.firstChild as HTMLElement

      expect(card.className).toContain('border')
      expect(card.className).toContain('rounded')
      expect(card.className).toContain('shadow')
    })

    it('should accept additional className prop', () => {
      const { container } = render(<Card className="custom-class"><div>Content</div></Card>)
      const card = container.firstChild as HTMLElement

      expect(card.className).toContain('custom-class')
    })
  })

  describe('CardTitle', () => {
    it('should render title text', () => {
      render(<CardTitle>Test Title</CardTitle>)
      expect(screen.getByText('Test Title')).toBeInTheDocument()
    })

    it('should apply title styling classes', () => {
      const { container } = render(<CardTitle>Title</CardTitle>)
      const title = container.firstChild as HTMLElement

      expect(title.className).toContain('bg-deep-sapphire')
      expect(title.className).toContain('text-polar-mist')
    })

    it('should accept additional className prop', () => {
      const { container } = render(<CardTitle className="custom-title">Title</CardTitle>)
      const title = container.firstChild as HTMLElement

      expect(title.className).toContain('custom-title')
    })
  })

  describe('CardBody', () => {
    it('should render body content', () => {
      render(<CardBody>Body content here</CardBody>)
      expect(screen.getByText('Body content here')).toBeInTheDocument()
    })

    it('should apply body padding', () => {
      const { container } = render(<CardBody>Content</CardBody>)
      const body = container.firstChild as HTMLElement

      expect(body.className).toContain('p-')
    })

    it('should accept additional className prop', () => {
      const { container } = render(<CardBody className="custom-body">Content</CardBody>)
      const body = container.firstChild as HTMLElement

      expect(body.className).toContain('custom-body')
    })
  })

  describe('Card Integration', () => {
    it('should render card with title and body together', () => {
      render(
        <Card>
          <CardTitle>Integration Test</CardTitle>
          <CardBody>This is the body</CardBody>
        </Card>
      )

      expect(screen.getByText('Integration Test')).toBeInTheDocument()
      expect(screen.getByText('This is the body')).toBeInTheDocument()
    })
  })
})
```

#### 3.2: Implement Card Component

Create `components/ui/card.tsx`:

```typescript
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

/**
 * Card component - styled container matching Angular .ui-card
 */
export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`border-3 border-deep-sapphire rounded shadow-md m-1 ${className}`}
    >
      {children}
    </div>
  )
}

/**
 * CardTitle component - header section of card
 */
export function CardTitle({ children, className = '' }: CardProps) {
  return (
    <div
      className={`bg-deep-sapphire text-polar-mist text-lg font-medium py-2 px-5 flex items-center justify-center ${className}`}
    >
      {children}
    </div>
  )
}

/**
 * CardBody component - content section of card
 */
export function CardBody({ children, className = '' }: CardProps) {
  return <div className={`p-2.5 ${className}`}>{children}</div>
}
```

#### 3.3: Run Card Tests

```bash
npx tsc --noEmit
npx eslint --fix components/ui/card.tsx __tests__/components/ui/card.test.tsx
npx prettier --write components/ui/card.tsx __tests__/components/ui/card.test.tsx
npx vitest run __tests__/components/ui/card.test.tsx
```

### Step 4: Create Button Component (TDD)

#### 4.1: Create Button Component Test

Create `__tests__/components/ui/button.test.tsx`:

```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/ui/button'

describe('Button Component', () => {
  it('should render button text', () => {
    render(<Button>Click Me</Button>)
    expect(screen.getByRole('button', { name: 'Click Me' })).toBeInTheDocument()
  })

  it('should handle click events', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<Button onClick={handleClick}>Click Me</Button>)

    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('should apply primary variant styling', () => {
    const { container } = render(<Button variant="primary">Primary</Button>)
    const button = screen.getByRole('button')

    expect(button.className).toContain('bg-deep-sapphire')
  })

  it('should apply secondary variant styling', () => {
    const { container } = render(<Button variant="secondary">Secondary</Button>)
    const button = screen.getByRole('button')

    expect(button.className).toContain('bg-warm-sand')
  })

  it('should apply outline variant styling', () => {
    const { container } = render(<Button variant="outline">Outline</Button>)
    const button = screen.getByRole('button')

    expect(button.className).toContain('border')
    expect(button.className).toContain('bg-transparent')
  })

  it('should accept additional className prop', () => {
    render(<Button className="custom-button">Button</Button>)
    const button = screen.getByRole('button')

    expect(button.className).toContain('custom-button')
  })

  it('should support disabled state', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole('button')

    expect(button).toBeDisabled()
    expect(button.className).toContain('opacity-50')
  })

  it('should support type prop', () => {
    render(<Button type="submit">Submit</Button>)
    const button = screen.getByRole('button')

    expect(button).toHaveAttribute('type', 'submit')
  })
})
```

#### 4.2: Implement Button Component

Create `components/ui/button.tsx`:

```typescript
import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  className?: string
}

/**
 * Button component with multiple style variants
 */
export function Button({
  children,
  variant = 'primary',
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'px-4 py-2 rounded font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'

  const variantStyles = {
    primary:
      'bg-deep-sapphire text-polar-mist hover:bg-royal-indigo focus:ring-deep-sapphire',
    secondary:
      'bg-warm-sand text-deep-sapphire hover:bg-peach-puff focus:ring-warm-sand',
    outline:
      'bg-transparent border-2 border-deep-sapphire text-deep-sapphire hover:bg-deep-sapphire hover:text-polar-mist focus:ring-deep-sapphire',
  }

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : ''

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${disabledStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
```

#### 4.3: Run Button Tests

```bash
npx tsc --noEmit
npx eslint --fix components/ui/button.tsx __tests__/components/ui/button.test.tsx
npx prettier --write components/ui/button.tsx __tests__/components/ui/button.test.tsx
npx vitest run __tests__/components/ui/button.test.tsx
```

### Step 5: Create Heading Component (TDD)

#### 5.1: Create Heading Component Test

Create `__tests__/components/ui/heading.test.tsx`:

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Heading } from '@/components/ui/heading'

describe('Heading Component', () => {
  it('should render h1 by default', () => {
    render(<Heading>Default Heading</Heading>)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })

  it('should render h2 when level is 2', () => {
    render(<Heading level={2}>H2 Heading</Heading>)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()
  })

  it('should render h3 when level is 3', () => {
    render(<Heading level={3}>H3 Heading</Heading>)
    const heading = screen.getByRole('heading', { level: 3 })
    expect(heading).toBeInTheDocument()
  })

  it('should apply correct sizing for h1', () => {
    render(<Heading level={1}>Large Heading</Heading>)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading.className).toContain('text-4xl')
  })

  it('should apply correct sizing for h2', () => {
    render(<Heading level={2}>Medium Heading</Heading>)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading.className).toContain('text-3xl')
  })

  it('should apply correct sizing for h3', () => {
    render(<Heading level={3}>Small Heading</Heading>)
    const heading = screen.getByRole('heading', { level: 3 })
    expect(heading.className).toContain('text-2xl')
  })

  it('should apply deep-sapphire color by default', () => {
    render(<Heading>Colored Heading</Heading>)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading.className).toContain('text-deep-sapphire')
  })

  it('should accept additional className prop', () => {
    render(<Heading className="custom-heading">Heading</Heading>)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading.className).toContain('custom-heading')
  })
})
```

#### 5.2: Implement Heading Component

Create `components/ui/heading.tsx`:

```typescript
import type { ReactNode } from 'react'

interface HeadingProps {
  children: ReactNode
  level?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
}

/**
 * Heading component with semantic HTML and consistent styling
 */
export function Heading({ children, level = 1, className = '' }: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements

  const sizeStyles = {
    1: 'text-4xl',
    2: 'text-3xl',
    3: 'text-2xl',
    4: 'text-xl',
    5: 'text-lg',
    6: 'text-base',
  }

  const baseStyles = 'font-bold text-deep-sapphire mb-4'

  return (
    <Tag className={`${baseStyles} ${sizeStyles[level]} ${className}`}>
      {children}
    </Tag>
  )
}
```

#### 5.3: Run Heading Tests

```bash
npx tsc --noEmit
npx eslint --fix components/ui/heading.tsx __tests__/components/ui/heading.test.tsx
npx prettier --write components/ui/heading.tsx __tests__/components/ui/heading.test.tsx
npx vitest run __tests__/components/ui/heading.test.tsx
```

### Step 6: Create Component Index File

Create `components/ui/index.ts`:

```typescript
export { Card, CardTitle, CardBody } from './card'
export { Button } from './button'
export { Heading } from './heading'
```

### Step 7: Run All Design System Tests

```bash
npx tsc --noEmit
npx eslint --fix components/ui/**/*.tsx __tests__/components/ui/**/*.tsx
npx prettier --write components/ui/**/*.tsx __tests__/components/ui/**/*.tsx app/globals.css
npx vitest run __tests__/components/ui/
npm run build
```

## Files to Create/Modify

- `app/globals.css` - Update with Tailwind v4 `@theme` directive for custom colors, layout, and typography
- `app/layout.tsx` - Configure Roboto font using Next.js font loader
- `components/ui/card.tsx` - Card, CardTitle, CardBody components
- `components/ui/button.tsx` - Button component with variants
- `components/ui/heading.tsx` - Heading component with levels
- `components/ui/index.ts` - Barrel export for UI components
- `__tests__/components/ui/card.test.tsx` - Tests for Card components
- `__tests__/components/ui/button.test.tsx` - Tests for Button component
- `__tests__/components/ui/heading.test.tsx` - Tests for Heading component

**Note**: Tailwind configuration tests (`__tests__/styles/tailwind-config.test.ts`) were omitted for Tailwind v4 as the CSS-based `@theme` configuration doesn't use `resolveConfig` from `tailwindcss/resolveConfig`. Visual verification in browser DevTools is recommended instead.

## Testing Requirements

### Unit Tests

- Component tests verify rendering, styling, props, interactions
- Test coverage >80% for all UI components
- **Note**: Tailwind v4 configuration uses CSS `@theme` directive, so traditional `resolveConfig` tests are not applicable. Visual verification is used instead.

### Manual Visual Testing

- Verify color values match Angular SCSS variables exactly
- Verify Card component matches Angular `.ui-card` styling
- Verify Button variants provide adequate visual hierarchy
- Verify Heading sizes are appropriate for content hierarchy

## Success Criteria

- [ ] Tailwind v4 `@theme` directive configured in `app/globals.css` with complete custom theme
- [ ] All 10 custom colors configured correctly with CSS variables
- [ ] Roboto font family configured via Next.js font loader
- [ ] Max/min width configured for site layout
- [ ] Custom border width (border-3) configured
- [ ] Card component created with full test coverage
- [ ] Button component created with 3 variants and full test coverage
- [ ] Heading component created with 6 levels and full test coverage
- [ ] Component index file created for easy imports
- [ ] All UI component tests pass
- [ ] TypeScript compilation succeeds (npx tsc --noEmit)
- [ ] ESLint passes (npx eslint --fix)
- [ ] Prettier formatting applied (npx prettier --write)
- [ ] Test coverage >80% for components/ui/
- [ ] Build completes successfully (npm run build)
- [ ] Colors match Angular SCSS variables exactly (verified in browser DevTools)
- [ ] Components are reusable and follow SOLID principles
- [ ] Components accept className prop for extensibility

## Notes

### Color Palette Usage Guidelines

**Primary Colors** (most common):

- `deep-sapphire` - Main brand color, navigation, headings
- `warm-sand` - Accents, active states, CTAs
- `pure-white` - Backgrounds, text on dark backgrounds

**Secondary Colors**:

- `polar-mist` - Light text on dark backgrounds
- `royal-indigo` - Hover states
- `peach-puff` - Soft accents

**Tertiary Colors**:

- `bengal-blue`, `raspberry-smoothie`, `north-pole-blue` - Specific use cases
- `ultra-pure-white` - Alternative background

### Component Design Principles

1. **Composability**: Components should compose well together
2. **Extensibility**: Always accept className prop for additional styling
3. **Accessibility**: Use semantic HTML (button, h1-h6)
4. **Consistency**: Follow Tailwind conventions
5. **Simplicity**: Keep components focused and simple

### Visual Regression Prevention

To ensure visual match to Angular app:

- Extract exact hex values from Angular SCSS
- Use same border widths, radii, shadows
- Match font sizes and weights
- Preserve spacing (padding, margins)

### Future Component Additions

This task creates the foundation. Future components may include:

- Input components
- Form components
- Modal components
- Alert/notification components

These will follow the same TDD approach and extend the design system.

---

**Task Created**: 2026-01-21
**Estimated Duration**: 6-8 hours
**Complexity**: Medium
**Risk Level**: Low
