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
    it('renders a link to the PDF', () => {
        render(<NewsletterCard newsletter={mockNewsletter} />)
        const link = screen.getByRole('link')
        expect(link).toHaveAttribute('href', '/assets/newsletters/CompassNewsletter2021Q4.pdf')
        expect(link).toHaveAttribute('target', '_blank')
    })

    it('renders a newsletter image with alt text', () => {
        render(<NewsletterCard newsletter={mockNewsletter} />)
        const img = screen.getByRole('img', { name: /The Comparison Trap/i })
        expect(img).toBeInTheDocument()
        expect(img).toHaveAttribute('src', '/assets/newsletters/CompassNewsletter2021Q4.png')
    })
})
