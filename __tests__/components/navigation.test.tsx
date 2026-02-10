import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Navigation from '@/components/navigation'

let mockPathname = '/'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
}))

beforeEach(() => {
  mockPathname = '/'
})

describe('Navigation', () => {
  describe('Desktop Navigation', () => {
    it('should render all navigation links', () => {
      render(<Navigation variant="desktop" />)
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('Meet Us')).toBeInTheDocument()
      expect(screen.getByText('Our Services')).toBeInTheDocument()
      expect(screen.getByText('FAQ')).toBeInTheDocument()
      expect(screen.getByText('Resources')).toBeInTheDocument()
      expect(screen.getByText('Contact Us')).toBeInTheDocument()
    })

    it('should apply font-bold to the active link when pathname matches', () => {
      mockPathname = '/meet-us'
      render(<Navigation variant="desktop" />)
      const activeLink = screen.getByText('Meet Us')
      expect(activeLink).toHaveClass('font-bold')
    })

    it('should apply font-normal to inactive links when pathname does not match', () => {
      mockPathname = '/meet-us'
      render(<Navigation variant="desktop" />)
      const inactiveLink = screen.getByText('Home')
      expect(inactiveLink).toHaveClass('font-normal')
    })
  })

  describe('Mobile Navigation', () => {
    it('should render sidenav when open', () => {
      render(<Navigation variant="mobile" isOpen={true} onClose={() => {}} />)
      const links = screen.getAllByRole('link')
      expect(links.length).toBe(6)
    })

    it('should have id="mobile-sidenav" on the nav element', () => {
      const { container } = render(
        <Navigation variant="mobile" isOpen={false} onClose={() => {}} />
      )
      const sidenav = container.querySelector('nav')
      expect(sidenav).toHaveAttribute('id', 'mobile-sidenav')
    })

    it('should be hidden when closed', () => {
      const { container } = render(
        <Navigation variant="mobile" isOpen={false} onClose={() => {}} />
      )
      const sidenav = container.querySelector('nav')
      expect(sidenav).toHaveClass('-translate-x-full')
    })

    it('should be visible when open', () => {
      const { container } = render(<Navigation variant="mobile" isOpen={true} onClose={() => {}} />)
      const sidenav = container.querySelector('nav')
      expect(sidenav).toHaveClass('translate-x-0')
    })

    describe('Backdrop', () => {
      it('should render backdrop with opacity-100 and visible when isOpen is true', () => {
        const { container } = render(
          <Navigation variant="mobile" isOpen={true} onClose={() => {}} />
        )
        // Backdrop is the first div (before the nav)
        const backdrop = container.querySelector('div')
        expect(backdrop).toHaveClass('opacity-100')
        expect(backdrop).toHaveClass('visible')
      })

      it('should render backdrop with opacity-0 and invisible when isOpen is false', () => {
        const { container } = render(
          <Navigation variant="mobile" isOpen={false} onClose={() => {}} />
        )
        const backdrop = container.querySelector('div')
        expect(backdrop).toHaveClass('opacity-0')
        expect(backdrop).toHaveClass('invisible')
      })

      it('should have aria-hidden="true" on the backdrop', () => {
        const { container } = render(
          <Navigation variant="mobile" isOpen={true} onClose={() => {}} />
        )
        const backdrop = container.querySelector('div')
        expect(backdrop).toHaveAttribute('aria-hidden', 'true')
      })

      it('should call onClose when backdrop is clicked', async () => {
        const user = userEvent.setup()
        const onClose = vi.fn()
        const { container } = render(
          <Navigation variant="mobile" isOpen={true} onClose={onClose} />
        )
        const backdrop = container.querySelector('div')!
        await user.click(backdrop)
        expect(onClose).toHaveBeenCalledTimes(1)
      })
    })
  })
})
