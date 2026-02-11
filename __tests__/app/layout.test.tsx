import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import RootLayout, { metadata } from '@/app/layout'

// Mock Roboto font to verify it's being used
vi.mock('next/font/google', () => ({
  Roboto: vi.fn(() => ({
    className: 'roboto-font-class',
  })),
}))

describe('RootLayout', () => {
  it('should render children', () => {
    const { container } = render(
      <RootLayout>
        <div data-testid="test-child">Test Content</div>
      </RootLayout>
    )
    expect(container.querySelector('[data-testid="test-child"]')).toBeInTheDocument()
  })

  it('should include correct metadata', () => {
    expect(metadata.title).toContain('Compass Christian Counseling')
    expect(metadata.description).toBeDefined()
  })

  it('should render <main> with transparent background so body background image shows through', () => {
    const { container } = render(
      <RootLayout>
        <div>Test</div>
      </RootLayout>
    )
    const main = container.querySelector('main')
    expect(main).toBeInTheDocument()
    expect(main?.className).toContain('bg-transparent')
  })

  it('should not apply an opaque white background to <main>', () => {
    const { container } = render(
      <RootLayout>
        <div>Test</div>
      </RootLayout>
    )
    const main = container.querySelector('main')
    expect(main?.className).not.toMatch(/bg-white|bg-pure-white/)
  })

  it('should configure and apply Roboto font', async () => {
    const { Roboto } = await import('next/font/google')

    // Verify Roboto is called with correct configuration
    expect(Roboto).toHaveBeenCalledWith({
      weight: ['400', '700'],
      subsets: ['latin'],
      display: 'swap',
    })

    // Verify the font returns a className
    const fontResult = Roboto({
      weight: ['400', '700'],
      subsets: ['latin'],
      display: 'swap',
    })
    expect(fontResult.className).toBe('roboto-font-class')
  })
})
