import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Navigation from '@/components/navigation'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
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

    // Initially the mobile menu should show "Menu"
    expect(menuButton).toHaveTextContent('Menu')

    // Click to open
    await user.click(menuButton)

    // After click, button should show "Close"
    expect(menuButton).toHaveTextContent('Close')
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
})
