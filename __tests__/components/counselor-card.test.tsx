import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CounselorCard from '@/components/counselor-card'
import type { Counselor } from '@/types/models'

const mockCounselor: Counselor = {
    id: '1',
    firstName: 'Linda',
    lastName: 'Fentress',
    title: 'Ph.D, LPCC-S',
    shortDescription: 'Linda is a licensed professional counselor.',
    longDescription: ['Long bio here'],
    email: 'linda@compasslex.com',
    phone: '(859) 555-1234',
    credentials: ['Ph.D in Psychology'],
    insurance: ['Anthem Blue Cross'],
    memberships: ['ACA'],
    appointmentLink: 'https://example.com/appt',
    directoryId: 'dir-1',
    practitionerId: 'prac-1',
}

describe('CounselorCard', () => {
    it('renders the counselor first name in the title', () => {
        render(<CounselorCard counselor={mockCounselor} />)
        expect(screen.getByText(/Hi, I'm Linda/i)).toBeInTheDocument()
    })

    it('renders the counselor short description', () => {
        render(<CounselorCard counselor={mockCounselor} />)
        expect(screen.getByText('Linda is a licensed professional counselor.')).toBeInTheDocument()
    })

    it('renders the counselor full name', () => {
        render(<CounselorCard counselor={mockCounselor} />)
        expect(screen.getByText('Linda Fentress')).toBeInTheDocument()
    })

    it('renders the counselor title', () => {
        render(<CounselorCard counselor={mockCounselor} />)
        expect(screen.getByText('Ph.D, LPCC-S')).toBeInTheDocument()
    })

    it('renders a "Read More" link to the counselor detail page', () => {
        render(<CounselorCard counselor={mockCounselor} />)
        const link = screen.getByRole('link', { name: /Read More/i })
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', '/meet-us/Linda')
    })

    it('renders a counselor image with correct src', () => {
        render(<CounselorCard counselor={mockCounselor} />)
        const img = screen.getByRole('img', { name: /Linda Fentress/i })
        expect(img).toBeInTheDocument()
        expect(img).toHaveAttribute('src', '/assets/counselor-images/linda-meet-us-182x235.jpg')
    })

    it('renders the counselor image as a link to the detail page', () => {
        render(<CounselorCard counselor={mockCounselor} />)
        const img = screen.getByRole('img', { name: /Linda Fentress/i })
        expect(img.closest('a')).toHaveAttribute('href', '/meet-us/Linda')
    })
})
