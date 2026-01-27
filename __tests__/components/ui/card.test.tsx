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
      const { container } = render(
        <Card>
          <div>Content</div>
        </Card>
      )
      const card = container.firstChild as HTMLElement

      expect(card.className).toContain('border')
      expect(card.className).toContain('rounded')
      expect(card.className).toContain('shadow')
    })

    it('should accept additional className prop', () => {
      const { container } = render(
        <Card className="custom-class">
          <div>Content</div>
        </Card>
      )
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

    it('should handle long content without overflow', () => {
      const longText = 'a'.repeat(1000)
      const { container } = render(
        <Card>
          <CardBody>{longText}</CardBody>
        </Card>
      )
      const card = container.firstChild as HTMLElement

      // Card should have proper overflow handling
      expect(card).toBeInTheDocument()
      expect(screen.getByText(longText)).toBeInTheDocument()
    })

    it('should handle multiple CardBody components', () => {
      render(
        <Card>
          <CardBody>First section</CardBody>
          <CardBody>Second section</CardBody>
          <CardBody>Third section</CardBody>
        </Card>
      )

      expect(screen.getByText('First section')).toBeInTheDocument()
      expect(screen.getByText('Second section')).toBeInTheDocument()
      expect(screen.getByText('Third section')).toBeInTheDocument()
    })

    it('should render card without CardTitle', () => {
      render(
        <Card>
          <CardBody>Body only card</CardBody>
        </Card>
      )

      expect(screen.getByText('Body only card')).toBeInTheDocument()
    })

    it('should render card without CardBody', () => {
      render(
        <Card>
          <div>Custom content</div>
        </Card>
      )

      expect(screen.getByText('Custom content')).toBeInTheDocument()
    })

    it('should handle nested complex content', () => {
      render(
        <Card>
          <CardTitle>Complex Card</CardTitle>
          <CardBody>
            <div>
              <p>Paragraph 1</p>
              <p>Paragraph 2</p>
              <ul>
                <li>Item 1</li>
                <li>Item 2</li>
              </ul>
            </div>
          </CardBody>
        </Card>
      )

      expect(screen.getByText('Complex Card')).toBeInTheDocument()
      expect(screen.getByText('Paragraph 1')).toBeInTheDocument()
      expect(screen.getByText('Paragraph 2')).toBeInTheDocument()
      expect(screen.getByText('Item 1')).toBeInTheDocument()
      expect(screen.getByText('Item 2')).toBeInTheDocument()
    })
  })

  describe('Responsive Behavior', () => {
    it('should maintain structure with different content sizes', () => {
      const { rerender, container } = render(
        <Card>
          <CardTitle>Short</CardTitle>
          <CardBody>Short content</CardBody>
        </Card>
      )
      const shortCard = container.firstChild as HTMLElement

      expect(shortCard).toBeInTheDocument()

      rerender(
        <Card>
          <CardTitle>Very Long Title That Might Wrap On Smaller Screens</CardTitle>
          <CardBody>
            Very long content that contains multiple paragraphs and sections that might require
            different layouts on different screen sizes and should still maintain proper structure
          </CardBody>
        </Card>
      )
      const longCard = container.firstChild as HTMLElement

      expect(longCard).toBeInTheDocument()
      expect(longCard.className).toContain('border')
      expect(longCard.className).toContain('rounded')
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty string in Card', () => {
      const { container } = render(<Card>{''}</Card>)
      const card = container.firstChild as HTMLElement

      expect(card).toBeInTheDocument()
      expect(card.className).toContain('border')
    })

    it('should handle empty string in CardTitle', () => {
      render(<CardTitle>{''}</CardTitle>)

      // CardTitle doesn't use heading role, so we check it renders
      expect(document.querySelector('[class*="bg-deep-sapphire"]')).toBeInTheDocument()
    })

    it('should handle empty string in CardBody', () => {
      const { container } = render(<CardBody>{''}</CardBody>)
      const body = container.firstChild as HTMLElement

      expect(body).toBeInTheDocument()
      expect(body.className).toContain('p-')
    })

    it('should handle CardTitle with special characters', () => {
      render(<CardTitle>Title with &lt;&gt;&amp;&quot;&apos; special chars</CardTitle>)
      expect(screen.getByText(/Title with.*special chars/)).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should support semantic HTML structure', () => {
      const { container } = render(
        <Card>
          <CardTitle>Accessible Card</CardTitle>
          <CardBody>Content here</CardBody>
        </Card>
      )

      // Card should be a div by default (can be customized)
      const card = container.firstChild as HTMLElement
      expect(card.tagName).toBe('DIV')
    })

    it('should render accessible content structure', () => {
      render(
        <Card>
          <CardTitle>Profile</CardTitle>
          <CardBody>User details</CardBody>
        </Card>
      )

      expect(screen.getByText('Profile')).toBeInTheDocument()
      expect(screen.getByText('User details')).toBeInTheDocument()
    })
  })
})
