import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

/**
 * Card component - styled container matching Angular .ui-card
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardTitle>My Title</CardTitle>
 *   <CardBody>Content goes here</CardBody>
 * </Card>
 * ```
 */
export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`border-deep-sapphire m-1 rounded border-3 shadow-md ${className}`}>
      {children}
    </div>
  )
}

/**
 * CardTitle component - header section of card with brand styling
 */
export function CardTitle({ children, className = '' }: CardProps) {
  return (
    <div
      className={`bg-deep-sapphire text-polar-mist flex items-center justify-center px-5 py-2 text-lg font-medium ${className}`}
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
