import type { ReactNode, ElementType } from 'react'
import { cn } from '@/lib/utils'

interface HeadingProps {
  /** The heading content */
  children: ReactNode
  /** Semantic heading level (h1-h6) @default 1 */
  level?: 1 | 2 | 3 | 4 | 5 | 6
  /** Additional CSS classes to apply */
  className?: string
}

/**
 * Heading component with semantic HTML and consistent styling
 *
 * Provides proper heading hierarchy (h1-h6) with consistent brand styling.
 * Uses semantic HTML for accessibility and SEO.
 *
 * @example
 * ```tsx
 * <Heading level={1}>Page Title</Heading>
 * <Heading level={2}>Section Title</Heading>
 * <Heading level={3} className="mb-2">Subsection</Heading>
 * ```
 */
export function Heading({ children, level = 1, className = '' }: HeadingProps) {
  const Tag = `h${level}` as ElementType

  const sizeStyles = {
    1: 'text-4xl',
    2: 'text-3xl',
    3: 'text-2xl',
    4: 'text-xl',
    5: 'text-lg',
    6: 'text-base',
  }

  const baseStyles = 'font-bold text-deep-sapphire mb-4'

  return <Tag className={cn(baseStyles, sizeStyles[level], className)}>{children}</Tag>
}
