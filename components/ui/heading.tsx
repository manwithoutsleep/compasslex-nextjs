import type { ReactNode } from 'react'
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
    const tags = { 1: 'h1', 2: 'h2', 3: 'h3', 4: 'h4', 5: 'h5', 6: 'h6' } as const
    const Tag = tags[level]

    const levelStyles = {
        1: 'font-bold text-deep-sapphire mb-4 text-4xl',
        2: 'bg-deep-sapphire text-polar-mist mt-0 mb-1 px-3 text-[1.5em]',
        3: 'font-bold text-deep-sapphire mb-4 text-2xl',
        4: 'font-bold text-deep-sapphire mb-4 text-xl',
        5: 'font-bold text-deep-sapphire mb-4 text-lg',
        6: 'font-bold text-deep-sapphire mb-4 text-base',
    }

    return <Tag className={cn(levelStyles[level], className)}>{children}</Tag>
}
