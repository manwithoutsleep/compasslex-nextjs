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

  // Integration Tests
  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(
        <div>
          <Heading level={1}>Main Title</Heading>
          <Heading level={2}>Subtitle</Heading>
          <Heading level={3}>Section</Heading>
        </div>
      )

      expect(screen.getByRole('heading', { level: 1, name: 'Main Title' })).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 2, name: 'Subtitle' })).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 3, name: 'Section' })).toBeInTheDocument()
    })

    it('should provide accessible text content for screen readers', () => {
      render(<Heading>Page title</Heading>)
      const heading = screen.getByRole('heading', { name: 'Page title' })

      expect(heading).toBeInTheDocument()
      expect(heading.textContent).toBe('Page title')
    })

    it('should support className for custom styling including ids', () => {
      render(<Heading className="section-heading">Linkable Heading</Heading>)
      const heading = screen.getByRole('heading', { level: 1 })

      expect(heading).toHaveClass('section-heading')
      expect(heading).toBeInTheDocument()
    })
  })

  describe('Content Handling', () => {
    it('should handle long text content', () => {
      const longText =
        'This is a very long heading that might wrap to multiple lines on smaller screens'
      render(<Heading>{longText}</Heading>)

      expect(screen.getByText(longText)).toBeInTheDocument()
    })

    it('should handle empty string content', () => {
      render(<Heading>{''}</Heading>)
      const heading = screen.getByRole('heading', { level: 1 })

      expect(heading).toBeInTheDocument()
    })

    it('should handle special characters', () => {
      render(<Heading>Heading with &lt;&gt;&amp;&quot;&apos; special chars</Heading>)
      expect(screen.getByText(/Heading with.*special chars/)).toBeInTheDocument()
    })

    it('should handle complex children elements', () => {
      render(
        <Heading>
          <span>Part 1</span>
          {' - '}
          <span>Part 2</span>
        </Heading>
      )

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading.textContent).toBe('Part 1 - Part 2')
    })
  })

  describe('Responsive Behavior', () => {
    it('should maintain semantic structure across different content sizes', () => {
      const { rerender } = render(<Heading level={2}>Short</Heading>)

      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()

      rerender(
        <Heading level={2}>
          Very Long Heading Text That Might Need Different Styling Or Wrapping Behavior On Various
          Screen Sizes
        </Heading>
      )

      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toBeInTheDocument()
      expect(heading.className).toContain('text-3xl')
    })
  })

  describe('Edge Cases', () => {
    it('should handle numeric children', () => {
      render(<Heading>{123}</Heading>)
      expect(screen.getByText('123')).toBeInTheDocument()
    })

    it('should handle mixed content types', () => {
      render(
        <Heading>
          Text {123} <strong>Bold</strong>
        </Heading>
      )

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading.textContent).toBe('Text 123 Bold')
    })

    it('should allow all valid heading levels', () => {
      const { rerender } = render(<Heading level={1}>Level 1</Heading>)
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()

      rerender(<Heading level={2}>Level 2</Heading>)
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()

      rerender(<Heading level={3}>Level 3</Heading>)
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
    })
  })
})
