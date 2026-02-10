import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Counselor } from '@/types/models'

const mockCounselor: Counselor = {
  id: '1',
  firstName: 'Linda',
  lastName: 'Fentress',
  titles: ['Ph.D', 'LPCC-S'],
  shortDescription: 'Linda is a licensed professional counselor.',
  longDescription: '<p>Linda has extensive experience in counseling.</p>',
  email: 'linda@compasslex.com',
  phone: '(859) 555-1234',
  credentials: ['Ph.D in Psychology', 'Licensed Professional Counselor'],
  insurance: ['Anthem Blue Cross', 'Aetna'],
  memberships: ['American Counseling Association'],
  appointmentLink: 'https://example.com/appt',
  directoryId: 'dir-1',
  practitionerId: 'prac-1',
}

vi.mock('@/services/data-repository', () => ({
  counselorRepository: {
    getAllCounselors: vi.fn().mockResolvedValue([mockCounselor]),
    getCounselorByName: vi.fn().mockResolvedValue(mockCounselor),
  },
}))

vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('Not found')
  }),
}))

describe('Counselor Detail Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the counselor name as heading', async () => {
    const CounselorDetailPage = (await import('@/app/meet-us/[firstname]/page')).default
    const jsx = await CounselorDetailPage({ params: Promise.resolve({ firstname: 'Linda' }) })
    render(jsx)
    expect(screen.getByRole('heading', { name: /Linda Fentress/i })).toBeInTheDocument()
  })

  it('renders the counselor titles', async () => {
    const CounselorDetailPage = (await import('@/app/meet-us/[firstname]/page')).default
    const jsx = await CounselorDetailPage({ params: Promise.resolve({ firstname: 'Linda' }) })
    render(jsx)
    expect(screen.getByText('Ph.D')).toBeInTheDocument()
    expect(screen.getByText('LPCC-S')).toBeInTheDocument()
  })

  it('renders educational credentials section', async () => {
    const CounselorDetailPage = (await import('@/app/meet-us/[firstname]/page')).default
    const jsx = await CounselorDetailPage({ params: Promise.resolve({ firstname: 'Linda' }) })
    render(jsx)
    expect(screen.getByText('Educational/Professional')).toBeInTheDocument()
    expect(screen.getByText('Ph.D in Psychology')).toBeInTheDocument()
  })

  it('renders insurance section', async () => {
    const CounselorDetailPage = (await import('@/app/meet-us/[firstname]/page')).default
    const jsx = await CounselorDetailPage({ params: Promise.resolve({ firstname: 'Linda' }) })
    render(jsx)
    expect(screen.getByText('In Network Provider for:')).toBeInTheDocument()
    expect(screen.getByText('Anthem Blue Cross')).toBeInTheDocument()
  })

  it('renders memberships section', async () => {
    const CounselorDetailPage = (await import('@/app/meet-us/[firstname]/page')).default
    const jsx = await CounselorDetailPage({ params: Promise.resolve({ firstname: 'Linda' }) })
    render(jsx)
    expect(screen.getByText('Member of:')).toBeInTheDocument()
    expect(screen.getByText('American Counseling Association')).toBeInTheDocument()
  })

  it('renders email contact link', async () => {
    const CounselorDetailPage = (await import('@/app/meet-us/[firstname]/page')).default
    const jsx = await CounselorDetailPage({ params: Promise.resolve({ firstname: 'Linda' }) })
    render(jsx)
    const emailLink = screen.getByRole('link', { name: 'linda@compasslex.com' })
    expect(emailLink).toHaveAttribute('href', 'mailto:linda@compasslex.com')
  })

  it('renders appointment button', async () => {
    const CounselorDetailPage = (await import('@/app/meet-us/[firstname]/page')).default
    const jsx = await CounselorDetailPage({ params: Promise.resolve({ firstname: 'Linda' }) })
    render(jsx)
    const apptLink = screen.getByRole('link', { name: /Make an appointment/i })
    expect(apptLink).toHaveAttribute('href', 'https://example.com/appt')
  })

  it('calls notFound when counselor does not exist', async () => {
    const { counselorRepository } = await import('@/services/data-repository')
    vi.mocked(counselorRepository.getCounselorByName).mockResolvedValueOnce(null)
    const CounselorDetailPage = (await import('@/app/meet-us/[firstname]/page')).default
    await expect(
      CounselorDetailPage({ params: Promise.resolve({ firstname: 'Unknown' }) })
    ).rejects.toThrow('Not found')
  })
})
