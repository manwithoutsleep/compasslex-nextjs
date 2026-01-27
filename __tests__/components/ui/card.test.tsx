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
  })
})
