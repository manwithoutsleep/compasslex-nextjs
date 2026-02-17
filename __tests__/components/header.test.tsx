import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { usePathname } from 'next/navigation'
import Header from '@/components/header'

let mockPathname = '/'

// Mock next/navigation
vi.mock('next/navigation', () => ({
    usePathname: vi.fn(() => mockPathname),
}))

beforeEach(() => {
    mockPathname = '/'
    vi.mocked(usePathname).mockImplementation(() => mockPathname)
})

describe('Header', () => {
    describe('Desktop Header', () => {
        it('should render logo image', () => {
            render(<Header />)
            const logos = screen.getAllByAltText(/compass christian counseling/i)
            expect(logos).toHaveLength(3) // desktop logo + mobile logo + mobile icon
        })

        it('should render phone number', () => {
            render(<Header />)
            expect(screen.getByText('(859) 721-3259')).toBeInTheDocument()
        })

        it('should render Make an Appointment button', () => {
            render(<Header />)
            const button = screen.getByRole('link', { name: /make an appointment/i })
            expect(button).toHaveAttribute('href', '/contact-us')
        })
    })

    describe('Mobile Header', () => {
        it('should render menu button', () => {
            render(<Header />)
            const menuButton = screen.getByLabelText(/toggle menu/i)
            expect(menuButton).toBeInTheDocument()
        })

        it('should toggle mobile menu on button click', async () => {
            render(<Header />)
            const user = userEvent.setup()
            const menuButton = screen.getByLabelText(/toggle menu/i)

            // Menu should be closed initially
            expect(menuButton).toHaveTextContent('☰')
            expect(menuButton).toHaveAttribute('aria-expanded', 'false')

            // Click to open
            await user.click(menuButton)
            expect(menuButton).toHaveTextContent('✕')
            expect(menuButton).toHaveAttribute('aria-expanded', 'true')

            // Click to close
            await user.click(menuButton)
            expect(menuButton).toHaveTextContent('☰')
            expect(menuButton).toHaveAttribute('aria-expanded', 'false')
        })

        it('should have aria-controls pointing to the mobile sidenav', () => {
            render(<Header />)
            const menuButton = screen.getByLabelText(/toggle menu/i)
            expect(menuButton).toHaveAttribute('aria-controls', 'mobile-sidenav')
        })

        it('should close mobile menu on route change', async () => {
            const { rerender } = render(<Header />)
            const user = userEvent.setup()
            const menuButton = screen.getByLabelText(/toggle menu/i)

            // Open the menu
            await user.click(menuButton)
            expect(menuButton).toHaveTextContent('✕')

            // Simulate a route change
            mockPathname = '/meet-us'
            vi.mocked(usePathname).mockImplementation(() => mockPathname)
            rerender(<Header />)

            // Menu should be closed
            expect(menuButton).toHaveTextContent('☰')
        })
    })
})
