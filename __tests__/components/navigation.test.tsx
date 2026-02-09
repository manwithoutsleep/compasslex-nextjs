import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Navigation from '@/components/navigation'

// Mock next/navigation
const mockUsePathname = vi.fn(() => '/')
vi.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}))

describe('Navigation', () => {
  it('should render all 7 navigation links', () => {
    render(<Navigation />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Meet Us')).toBeInTheDocument()
    expect(screen.getByText('Our Services')).toBeInTheDocument()
    expect(screen.getByText('FAQ')).toBeInTheDocument()
    expect(screen.getByText('Getting Started')).toBeInTheDocument()
    expect(screen.getByText('Resources')).toBeInTheDocument()
    expect(screen.getByText('Contact Us')).toBeInTheDocument()
  })

  it('should have correct href attributes', () => {
    render(<Navigation />)
    const homeLink = screen.getAllByText('Home')[0].closest('a')
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('should toggle mobile menu on button click', async () => {
    render(<Navigation />)
    const user = userEvent.setup()
    const menuButton = screen.getByRole('button', { name: /menu/i })

    // Initially the mobile menu should show the hamburger icon
    expect(menuButton).toHaveTextContent('☰')

    // Click to open
    await user.click(menuButton)

    // After click, button should show the close icon
    expect(menuButton).toHaveTextContent('✕')
  })

  it('should highlight active link', () => {
    render(<Navigation />)
    const homeLinks = screen.getAllByText('Home')

    // Find the link elements
    homeLinks.forEach((link) => {
      const anchorElement = link.closest('a')
      if (anchorElement) {
        // Active link should have bold font weight
        expect(anchorElement.className).toContain('font-bold')
      }
    })
  })

  it('should show desktop navigation at 600px and above', () => {
    render(<Navigation />)
    // Find the desktop nav by looking for the first Home link and getting its parent div
    const homeLinks = screen.getAllByText('Home')
    const desktopHomeLink = homeLinks[0]
    const desktopNav = desktopHomeLink.closest('div')

    // Desktop nav should have min-[600px]:flex class and hidden class
    expect(desktopNav?.className).toContain('min-[600px]:flex')
    expect(desktopNav?.className).toContain('hidden')
  })

  it('should show mobile navigation below 600px', () => {
    render(<Navigation />)
    const mobileNav = screen.getByRole('button', { name: /menu/i }).parentElement

    // Mobile nav should have min-[600px]:hidden class
    expect(mobileNav?.className).toContain('min-[600px]:hidden')
  })

  describe('Accessibility', () => {
    it('should have aria-expanded false when menu is closed', () => {
      render(<Navigation />)
      const menuButton = screen.getByRole('button', { name: /menu/i })

      expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    })

    it('should have aria-expanded true when menu is open', async () => {
      render(<Navigation />)
      const user = userEvent.setup()
      const menuButton = screen.getByRole('button', { name: /menu/i })

      await user.click(menuButton)

      expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    })

    it('should have aria-controls pointing to mobile menu', () => {
      render(<Navigation />)
      const menuButton = screen.getByRole('button', { name: /menu/i })

      expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu')
    })

    it('should render mobile menu with correct id and role', async () => {
      render(<Navigation />)
      const user = userEvent.setup()
      const menuButton = screen.getByRole('button', { name: /menu/i })

      await user.click(menuButton)

      const mobileMenu = screen.getByRole('menu')
      expect(mobileMenu).toHaveAttribute('id', 'mobile-menu')
    })

    it('should have role menuitem on each mobile navigation link', async () => {
      render(<Navigation />)
      const user = userEvent.setup()
      const menuButton = screen.getByRole('button', { name: /menu/i })

      await user.click(menuButton)

      const menuItems = screen.getAllByRole('menuitem')
      expect(menuItems).toHaveLength(7)
    })

    it('should close mobile menu when Escape key is pressed', async () => {
      render(<Navigation />)
      const user = userEvent.setup()
      const menuButton = screen.getByRole('button', { name: /menu/i })

      // Open menu
      await user.click(menuButton)
      expect(menuButton).toHaveTextContent('✕')

      // Press Escape key
      await user.keyboard('{Escape}')

      // Menu should close
      expect(menuButton).toHaveTextContent('☰')
      expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    })

    it('should not throw error when Escape is pressed with menu closed', async () => {
      render(<Navigation />)
      const user = userEvent.setup()
      const menuButton = screen.getByRole('button', { name: /menu/i })

      // Press Escape with menu already closed
      await user.keyboard('{Escape}')

      // Should remain closed
      expect(menuButton).toHaveTextContent('☰')
      expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    })
  })

  describe('Edge Cases and User Workflows', () => {
    it('should close mobile menu when a link is clicked', async () => {
      render(<Navigation />)
      const user = userEvent.setup()
      const menuButton = screen.getByRole('button', { name: /menu/i })

      // Open menu
      await user.click(menuButton)
      expect(menuButton).toHaveTextContent('✕')
      expect(menuButton).toHaveAttribute('aria-expanded', 'true')

      // Click a link in the mobile menu
      const menuItems = screen.getAllByRole('menuitem')
      await user.click(menuItems[1]) // Click "Meet Us" link

      // Menu should close
      expect(menuButton).toHaveTextContent('☰')
      expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    })

    it('should update active link when pathname changes', () => {
      const { rerender } = render(<Navigation />)

      // Initially on home page (/)
      const homeLinks = screen.getAllByText('Home')
      homeLinks.forEach((link) => {
        const anchorElement = link.closest('a')
        if (anchorElement) {
          expect(anchorElement.className).toContain('font-bold')
        }
      })

      // Mock pathname change to /meet-us
      mockUsePathname.mockReturnValue('/meet-us')
      rerender(<Navigation />)

      // Meet Us should now be active
      const meetUsLinks = screen.getAllByText('Meet Us')
      meetUsLinks.forEach((link) => {
        const anchorElement = link.closest('a')
        if (anchorElement) {
          expect(anchorElement.className).toContain('font-bold')
        }
      })

      // Home should no longer be active
      const homeLinksAfter = screen.getAllByText('Home')
      homeLinksAfter.forEach((link) => {
        const anchorElement = link.closest('a')
        if (anchorElement) {
          expect(anchorElement.className).not.toContain('font-bold')
        }
      })
    })

    it('should handle multiple rapid toggles correctly', async () => {
      render(<Navigation />)
      const user = userEvent.setup()
      const menuButton = screen.getByRole('button', { name: /menu/i })

      // Initially closed
      expect(menuButton).toHaveTextContent('☰')

      // Rapid toggles
      await user.click(menuButton) // Open
      await user.click(menuButton) // Close
      await user.click(menuButton) // Open

      // Should end in open state
      expect(menuButton).toHaveTextContent('✕')
      expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    })
  })
})
