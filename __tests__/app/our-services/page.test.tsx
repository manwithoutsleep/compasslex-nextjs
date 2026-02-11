import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import OurServicesPage from '@/app/our-services/page'

describe('Our Services Page', () => {
    it('renders the page heading', () => {
        render(<OurServicesPage />)
        expect(screen.getByRole('heading', { name: /Our Services/i })).toBeInTheDocument()
    })

    it('renders individual counseling section', () => {
        render(<OurServicesPage />)
        expect(screen.getByText(/INDIVIDUAL COUNSELING/i)).toBeInTheDocument()
    })

    it('renders couples counseling section', () => {
        render(<OurServicesPage />)
        expect(screen.getByText(/COUPLES COUNSELING/i)).toBeInTheDocument()
    })

    it('renders family counseling section', () => {
        render(<OurServicesPage />)
        expect(screen.getByText(/FAMILY COUNSELING/i)).toBeInTheDocument()
    })

    it('renders group counseling section', () => {
        render(<OurServicesPage />)
        expect(screen.getByText(/GROUP COUNSELING/i)).toBeInTheDocument()
    })

    it('renders specific service areas', () => {
        render(<OurServicesPage />)
        expect(screen.getByText('Addictions')).toBeInTheDocument()
        expect(screen.getByText('Depression')).toBeInTheDocument()
        expect(screen.getByText('PTSD')).toBeInTheDocument()
    })
})
