import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
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
      className={`${baseStyles} ${variantStyles[variant]} ${disabledStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
