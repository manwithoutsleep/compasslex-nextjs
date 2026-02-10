import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import NewsletterCard from '@/components/newsletter-card'
import type { Newsletter } from '@/types/models'

const mockNewsletter: Newsletter = {
  id: '24',
  title: 'The Comparison Trap',
  quarter: '4',
  year: '2021',
  description: null,
}

describe('NewsletterCard', () => {
  it('renders the newsletter title', () => {
    render(<NewsletterCard newsletter={mockNewsletter} />)
    expect(screen.getByText('The Comparison Trap')).toBeInTheDocument()
  })

  it('renders the year and quarter', () => {
    render(<NewsletterCard newsletter={mockNewsletter} />)
    expect(screen.getByText(/2021/)).toBeInTheDocument()
    expect(screen.getByText(/Q4/)).toBeInTheDocument()
  })

  it('renders a PDF download link', () => {
    render(<NewsletterCard newsletter={mockNewsletter} />)
    const link = screen.getByRole('link', { name: /download/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/assets/newsletters/CompassNewsletter2021Q4.pdf')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('renders a newsletter image', () => {
    render(<NewsletterCard newsletter={mockNewsletter} />)
    const img = screen.getByRole('img', { name: /The Comparison Trap/i })
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/assets/newsletters/CompassNewsletter2021Q4.png')
  })
})
