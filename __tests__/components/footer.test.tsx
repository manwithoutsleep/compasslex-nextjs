import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '@/components/footer'

describe('Footer', () => {
    it('should render address information', () => {
        render(<Footer />)
        expect(screen.getByText(/Compass Christian Counseling/i)).toBeInTheDocument()
        expect(screen.getByText(/651 Perimeter Drive, Suite 115/i)).toBeInTheDocument()
        expect(screen.getByText(/Lexington, KY 40517/i)).toBeInTheDocument()
        expect(screen.getByText(/\(859\) 721-3259/i)).toBeInTheDocument()
    })

    it('should render building image', () => {
        render(<Footer />)
        const image = screen.getByAltText(/building/i)
        expect(image).toBeInTheDocument()
    })

    it('should render map placeholder', () => {
        render(<Footer />)
        expect(screen.getByText(/Map will be integrated in Task 06/i)).toBeInTheDocument()
    })

    it('should not apply a background-image to the footer element', () => {
        const { container } = render(<Footer />)
        const footer = container.querySelector('footer')
        expect(footer).toBeInTheDocument()
        expect(footer?.className).not.toMatch(/bg-\[url/)
    })
})
