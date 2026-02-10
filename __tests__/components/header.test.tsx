import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from '@/components/header'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Header', () => {
  describe('Desktop Header', () => {
    it('should render logo image', () => {
      render(<Header />)
      const logos = screen.getAllByAltText(/compass christian counseling/i)
      expect(logos.length).toBeGreaterThan(0)
      expect(logos[0]).toBeInTheDocument()
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

      // Click to open
      await user.click(menuButton)
      expect(menuButton).toHaveTextContent('✕')
    })
  })
})
