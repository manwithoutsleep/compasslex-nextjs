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
    render(<Button variant="primary">Primary</Button>)
    const button = screen.getByRole('button')

    expect(button.className).toContain('bg-deep-sapphire')
  })

  it('should apply secondary variant styling', () => {
    render(<Button variant="secondary">Secondary</Button>)
    const button = screen.getByRole('button')

    expect(button.className).toContain('bg-warm-sand')
  })

  it('should apply outline variant styling', () => {
    render(<Button variant="outline">Outline</Button>)
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
