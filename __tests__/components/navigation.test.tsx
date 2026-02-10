import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Navigation from '@/components/navigation'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Navigation', () => {
  describe('Desktop Navigation', () => {
    it('should render all navigation links', () => {
      render(<Navigation isMobile={false} />)
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('Meet Us')).toBeInTheDocument()
      expect(screen.getByText('Our Services')).toBeInTheDocument()
      expect(screen.getByText('FAQ')).toBeInTheDocument()
      expect(screen.getByText('Getting Started')).toBeInTheDocument()
      expect(screen.getByText('Resources')).toBeInTheDocument()
      expect(screen.getByText('Contact Us')).toBeInTheDocument()
    })
  })

  describe('Mobile Navigation', () => {
    it('should render sidenav when open', () => {
      render(<Navigation isMobile={true} isOpen={true} onClose={() => {}} />)
      const links = screen.getAllByRole('link')
      expect(links.length).toBe(7)
    })

    it('should be hidden when closed', () => {
      const { container } = render(<Navigation isMobile={true} isOpen={false} onClose={() => {}} />)
      const sidenav = container.querySelector('nav')
      expect(sidenav).toHaveClass('-translate-x-full')
    })
  })
})
