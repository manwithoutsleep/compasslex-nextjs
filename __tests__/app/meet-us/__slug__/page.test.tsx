import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Counselor } from '@/types/models'

const mockCounselor: Counselor = {
    id: '1',
    firstName: 'Linda',
    lastName: 'Fentress',
    title: 'Ph.D, LPCC-S',
    shortDescription: 'Linda is a licensed professional counselor.',
    longDescription: ['Linda has extensive experience in counseling.'],
    email: 'linda@compasslex.com',
    phone: '(859) 555-1234',
    credentials: ['Ph.D in Psychology', 'Licensed Professional Counselor'],
    insurance: ['Anthem Blue Cross', 'Aetna'],
    memberships: ['American Counseling Association'],
    appointmentLink: 'https://example.com/appt',
    directoryId: 'dir-1',
    practitionerId: 'prac-1',
    slug: 'linda',
}

vi.mock('@/services/data-repository', () => ({
    counselorRepository: {
        getAllCounselors: vi.fn().mockResolvedValue([mockCounselor]),
        getCounselorBySlug: vi.fn().mockResolvedValue(mockCounselor),
    },
}))

vi.mock('next/navigation', () => ({
    notFound: vi.fn(() => {
        throw new Error('Not found')
    }),
}))

describe('Counselor Detail Page', () => {
    beforeEach(async () => {
        vi.clearAllMocks()
        const CounselorDetailPage = (await import('@/app/meet-us/[slug]/page')).default
        const jsx = await CounselorDetailPage({ params: Promise.resolve({ slug: 'linda' }) })
        render(jsx)
    })

    it('renders the counselor name as heading', () => {
        expect(screen.getByRole('heading', { name: /Linda Fentress/i })).toBeInTheDocument()
    })

    it('renders the counselor title', () => {
        expect(screen.getByText('Ph.D, LPCC-S')).toBeInTheDocument()
    })

    it('renders educational credentials section', () => {
        expect(screen.getByText('Educational/Professional')).toBeInTheDocument()
        expect(screen.getByText('Ph.D in Psychology')).toBeInTheDocument()
    })

    it('renders insurance section', () => {
        expect(screen.getByText('In Network Provider for:')).toBeInTheDocument()
        expect(screen.getByText('Anthem Blue Cross')).toBeInTheDocument()
    })

    it('renders memberships section', () => {
        expect(screen.getByText('Member of:')).toBeInTheDocument()
        expect(screen.getByText('American Counseling Association')).toBeInTheDocument()
    })

    it('renders email contact link', () => {
        const emailLink = screen.getByRole('link', { name: 'linda@compasslex.com' })
        expect(emailLink).toHaveAttribute('href', 'mailto:linda@compasslex.com')
    })

    it('renders appointment button', () => {
        const apptLink = screen.getByRole('link', { name: /Make an appointment/i })
        expect(apptLink).toHaveAttribute('href', 'https://example.com/appt')
    })

    it('calls notFound when counselor does not exist', async () => {
        const { counselorRepository } = await import('@/services/data-repository')
        vi.mocked(counselorRepository.getCounselorBySlug).mockResolvedValueOnce(null)
        const CounselorDetailPage = (await import('@/app/meet-us/[slug]/page')).default
        await expect(
            CounselorDetailPage({ params: Promise.resolve({ slug: 'unknown' }) })
        ).rejects.toThrow('Not found')
    })
})
