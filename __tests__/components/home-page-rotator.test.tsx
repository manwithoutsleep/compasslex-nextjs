import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import HomePageRotator from '@/components/home-page-rotator'

const ROTATION_INTERVAL_MS = 5000

describe('HomePageRotator', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('renders the rotator text overlay', () => {
        render(<HomePageRotator />)
        expect(
            screen.getByText('Sometimes you just need a little help along the way')
        ).toBeInTheDocument()
    })

    it('renders all 5 image slides', () => {
        const { container } = render(<HomePageRotator />)
        const slides = container.querySelectorAll('.rotator-item')
        expect(slides).toHaveLength(5)
    })

    it('starts with the first slide active', () => {
        const { container } = render(<HomePageRotator />)
        const slides = container.querySelectorAll('.rotator-item')
        expect(slides[0]).toHaveClass('active')
    })

    it('marks non-active slides as aria-hidden', () => {
        const { container } = render(<HomePageRotator />)
        const slides = container.querySelectorAll('.rotator-item')
        expect(slides[0]).toHaveAttribute('aria-hidden', 'false')
        for (let i = 1; i < slides.length; i++) {
            expect(slides[i]).toHaveAttribute('aria-hidden', 'true')
        }
    })

    it('advances to the next slide after the rotation interval', () => {
        const { container } = render(<HomePageRotator />)
        const slides = container.querySelectorAll('.rotator-item')

        act(() => {
            vi.advanceTimersByTime(ROTATION_INTERVAL_MS)
        })

        expect(slides[1]).toHaveClass('active')
        expect(slides[0]).not.toHaveClass('active')
    })

    it('cycles back to the first slide after the last slide', () => {
        const { container } = render(<HomePageRotator />)
        const slides = container.querySelectorAll('.rotator-item')

        act(() => {
            vi.advanceTimersByTime(ROTATION_INTERVAL_MS * slides.length)
        })

        expect(slides[0]).toHaveClass('active')
    })

    it('wraps the content in a home-page-rotator container', () => {
        const { container } = render(<HomePageRotator />)
        expect(container.querySelector('.home-page-rotator')).toBeInTheDocument()
    })
})
