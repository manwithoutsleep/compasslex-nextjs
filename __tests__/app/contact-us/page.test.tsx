import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Counselor } from '@/types/models'

const mockCounselors: Counselor[] = [
    {
        id: '1',
        firstName: 'Linda',
        lastName: 'Fentress',
        title: 'Ph.D, LPCC-S',
        shortDescription: 'Linda is a licensed professional counselor.',
        longDescription: ['Bio'],
        email: 'linda@compasslex.com',
        phone: '(859) 555-1234',
        credentials: [],
        insurance: [],
        memberships: [],
        appointmentLink: 'https://example.com',
        directoryId: 'dir-1',
        practitionerId: 'prac-1',
        slug: 'linda',
    },
]

vi.mock('@/services/data-repository', () => ({
    counselorRepository: {
        getAllCounselors: vi.fn().mockResolvedValue(mockCounselors),
    },
}))

describe('Contact Us Page', () => {
    beforeEach(async () => {
        vi.clearAllMocks()
        const ContactUsPage = (await import('@/app/contact-us/page')).default
        const jsx = await ContactUsPage()
        render(jsx)
    })

    it('renders the page heading', () => {
        expect(screen.getByRole('heading', { name: /Contact Us/i })).toBeInTheDocument()
    })

    it('renders the intro text about calling', () => {
        expect(screen.getByText(/Call us with questions/i)).toBeInTheDocument()
    })

    it('renders counselor contact cards', () => {
        expect(screen.getByText('Linda Fentress')).toBeInTheDocument()
        expect(screen.getByText('(859) 555-1234')).toBeInTheDocument()
    })

    it('renders the office address', () => {
        expect(screen.getByText(/651 Perimeter Drive/)).toBeInTheDocument()
        expect(screen.getByText(/Lexington, KY 40517/)).toBeInTheDocument()
    })

    it('renders directions to the office', () => {
        expect(screen.getByText(/New Circle Road/)).toBeInTheDocument()
    })

    it('renders the Google Map', () => {
        expect(screen.getByTestId('google-map-contact')).toBeInTheDocument()
    })

    it('does NOT render a contact form', () => {
        expect(screen.queryByRole('form')).not.toBeInTheDocument()
    })
})
