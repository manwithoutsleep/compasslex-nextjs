import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import HomePage from '@/app/page'

vi.mock('@/components/home-page-rotator', () => ({
    default: () => <div data-testid="home-page-rotator" />,
}))

describe('Home Page', () => {
    it('renders the HomePageRotator component', () => {
        render(<HomePage />)
        expect(screen.getByTestId('home-page-rotator')).toBeInTheDocument()
    })

    it('renders the intro paragraph about Compass Christian Counseling', () => {
        render(<HomePage />)
        expect(
            screen.getByText(
                /At Compass Christian Counseling our goal is to provide a safe and supportive/
            )
        ).toBeInTheDocument()
    })

    it('renders a Meet Us section with link', () => {
        render(<HomePage />)
        const meetUsLink = screen.getByRole('link', { name: /Meet Us/i })
        expect(meetUsLink).toBeInTheDocument()
        expect(meetUsLink).toHaveAttribute('href', '/meet-us')
    })

    it('renders an Our Services section with link', () => {
        render(<HomePage />)
        const link = screen.getByRole('link', { name: /Our Services/i })
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', '/our-services')
    })

    it('renders a FAQ section with link', () => {
        render(<HomePage />)
        const link = screen.getByRole('link', { name: /FAQ/i })
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', '/faq')
    })

    it('renders a Resources section with link', () => {
        render(<HomePage />)
        const link = screen.getByRole('link', { name: /Resources/i })
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', '/resources')
    })

    it('renders a Contact Us section with link', () => {
        render(<HomePage />)
        const link = screen.getByRole('link', { name: /Contact Us/i })
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', '/contact-us')
    })
})
