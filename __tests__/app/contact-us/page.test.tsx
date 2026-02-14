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
    },
]

vi.mock('@/services/data-repository', () => ({
    counselorRepository: {
        getAllCounselors: vi.fn().mockResolvedValue(mockCounselors),
    },
}))

describe('Contact Us Page', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders the page heading', async () => {
        const ContactUsPage = (await import('@/app/contact-us/page')).default
        const jsx = await ContactUsPage()
        render(jsx)
        expect(screen.getByRole('heading', { name: /Contact Us/i })).toBeInTheDocument()
    })

    it('renders the intro text about calling', async () => {
        const ContactUsPage = (await import('@/app/contact-us/page')).default
        const jsx = await ContactUsPage()
        render(jsx)
        expect(screen.getByText(/Call us with questions/i)).toBeInTheDocument()
    })

    it('renders counselor contact cards', async () => {
        const ContactUsPage = (await import('@/app/contact-us/page')).default
        const jsx = await ContactUsPage()
        render(jsx)
        expect(screen.getByText('Linda Fentress')).toBeInTheDocument()
        expect(screen.getByText('(859) 555-1234')).toBeInTheDocument()
    })

    it('renders the office address', async () => {
        const ContactUsPage = (await import('@/app/contact-us/page')).default
        const jsx = await ContactUsPage()
        render(jsx)
        expect(screen.getByText(/651 Perimeter Drive/)).toBeInTheDocument()
        expect(screen.getByText(/Lexington, KY 40517/)).toBeInTheDocument()
    })

    it('renders directions to the office', async () => {
        const ContactUsPage = (await import('@/app/contact-us/page')).default
        const jsx = await ContactUsPage()
        render(jsx)
        expect(screen.getByText(/New Circle Road/)).toBeInTheDocument()
    })

    it('renders a map placeholder', async () => {
        const ContactUsPage = (await import('@/app/contact-us/page')).default
        const jsx = await ContactUsPage()
        render(jsx)
        expect(screen.getByTestId('map-placeholder')).toBeInTheDocument()
    })

    it('does NOT render a contact form', async () => {
        const ContactUsPage = (await import('@/app/contact-us/page')).default
        const jsx = await ContactUsPage()
        render(jsx)
        expect(screen.queryByRole('form')).not.toBeInTheDocument()
    })
})
