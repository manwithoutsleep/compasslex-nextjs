import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Newsletter } from '@/types/models'

const mockNewsletters: Newsletter[] = [
  {
    id: '24',
    title: 'The Comparison Trap',
    quarter: '4',
    year: '2021',
    description: null,
  },
  {
    id: '23',
    title: 'How Good Are Your Listening Skills?',
    quarter: '3',
    year: '2021',
    description: null,
  },
  {
    id: '1',
    title: 'Building Resilience',
    quarter: '1',
    year: '2016',
    description: null,
  },
]

vi.mock('@/services/data-repository', () => ({
  newsletterRepository: {
    getAllNewsletters: vi.fn().mockResolvedValue(mockNewsletters),
  },
}))

describe('Newsletters Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the page heading "Compass Articles"', async () => {
    const NewslettersPage = (await import('@/app/newsletters/page')).default
    const jsx = await NewslettersPage()
    render(jsx)
    expect(screen.getByRole('heading', { name: /Compass Articles/i })).toBeInTheDocument()
  })

  it('renders the intro paragraph', async () => {
    const NewslettersPage = (await import('@/app/newsletters/page')).default
    const jsx = await NewslettersPage()
    render(jsx)
    expect(
      screen.getByText(/Compass Christian Counseling Articles cover a variety of topics/i)
    ).toBeInTheDocument()
  })

  it('renders newsletter cards for each newsletter', async () => {
    const NewslettersPage = (await import('@/app/newsletters/page')).default
    const jsx = await NewslettersPage()
    render(jsx)
    expect(screen.getByText('The Comparison Trap')).toBeInTheDocument()
    expect(screen.getByText('How Good Are Your Listening Skills?')).toBeInTheDocument()
    expect(screen.getByText('Building Resilience')).toBeInTheDocument()
  })

  it('renders newsletters in order (newest first)', async () => {
    const NewslettersPage = (await import('@/app/newsletters/page')).default
    const jsx = await NewslettersPage()
    render(jsx)
    const titles = screen.getAllByRole('heading', { level: 3 })
    // First newsletter title should be the most recent (id 24)
    expect(titles[0]).toHaveTextContent('The Comparison Trap')
  })
})
