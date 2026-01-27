import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** The button content */
  children: ReactNode
  /** Visual style variant @default 'primary' */
  variant?: 'primary' | 'secondary' | 'outline'
  /** Additional CSS classes to apply */
  className?: string
}

/**
 * Button component with multiple style variants
 *
 * Provides three visual variants for different use cases:
 * - primary: Main call-to-action buttons
 * - secondary: Secondary actions
 * - outline: Tertiary or less prominent actions
 *
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleSubmit}>Submit</Button>
 * <Button variant="outline" type="button">Cancel</Button>
 * ```
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
    primary: 'bg-deep-sapphire text-polar-mist hover:bg-royal-indigo focus:ring-deep-sapphire',
    secondary: 'bg-warm-sand text-deep-sapphire hover:bg-peach-puff focus:ring-warm-sand',
    outline:
      'bg-transparent border-2 border-deep-sapphire text-deep-sapphire hover:bg-deep-sapphire hover:text-polar-mist focus:ring-deep-sapphire',
  }

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], disabledStyles, className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
