import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Counselor } from '@/types/models'

const mockCounselors: Counselor[] = [
  {
    id: '1',
    firstName: 'Linda',
    lastName: 'Fentress',
    titles: ['Ph.D', 'LPCC-S'],
    shortDescription: 'Linda is a licensed professional counselor.',
    longDescription: '<p>Bio</p>',
    email: 'linda@compasslex.com',
    phone: '(859) 555-1234',
    credentials: [],
    insurance: [],
    memberships: [],
    appointmentLink: 'https://example.com',
    directoryId: 'dir-1',
    practitionerId: 'prac-1',
  },
  {
    id: '2',
    firstName: 'Kelsi',
    lastName: 'Butcher',
    titles: ['M.A.', 'LPCC'],
    shortDescription: 'Kelsi is a compassionate counselor.',
    longDescription: '<p>Bio</p>',
    email: 'kelsi@compasslex.com',
    phone: '(859) 555-5678',
    credentials: [],
    insurance: [],
    memberships: [],
    appointmentLink: 'https://example.com',
    directoryId: 'dir-2',
    practitionerId: 'prac-2',
  },
]

vi.mock('@/services/data-repository', () => ({
  counselorRepository: {
    getAllCounselors: vi.fn().mockResolvedValue(mockCounselors),
  },
}))

describe('Meet Us Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the page heading', async () => {
    const MeetUsPage = (await import('@/app/meet-us/page')).default
    const jsx = await MeetUsPage()
    render(jsx)
    expect(screen.getByRole('heading', { name: /Meet Us/i })).toBeInTheDocument()
  })

  it('renders a card for each counselor', async () => {
    const MeetUsPage = (await import('@/app/meet-us/page')).default
    const jsx = await MeetUsPage()
    render(jsx)
    expect(screen.getByText(/Hi, I'm Linda/i)).toBeInTheDocument()
    expect(screen.getByText(/Hi, I'm Kelsi/i)).toBeInTheDocument()
  })

  it('renders counselor short descriptions', async () => {
    const MeetUsPage = (await import('@/app/meet-us/page')).default
    const jsx = await MeetUsPage()
    render(jsx)
    expect(screen.getByText('Linda is a licensed professional counselor.')).toBeInTheDocument()
  })
})
