import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import FaqPage from '@/app/faq/page'

describe('FAQ Page', () => {
  it('renders the page heading', () => {
    render(<FaqPage />)
    expect(screen.getByRole('heading', { name: /Frequently Asked Questions/i })).toBeInTheDocument()
  })

  it('renders question about counseling cost', () => {
    render(<FaqPage />)
    expect(
      screen.getByRole('heading', { name: /How much is counseling going to cost me/i })
    ).toBeInTheDocument()
  })

  it('renders answer about standard rates', () => {
    render(<FaqPage />)
    expect(screen.getByText(/\$110 for an individual session/)).toBeInTheDocument()
  })

  it('renders insurance question', () => {
    render(<FaqPage />)
    expect(screen.getByRole('heading', { name: /Can I use my insurance/i })).toBeInTheDocument()
  })

  it('renders question about Christian faith requirement', () => {
    render(<FaqPage />)
    expect(
      screen.getByRole('heading', { name: /Do I have to be a Christian/i })
    ).toBeInTheDocument()
  })

  it('renders cancellation policy question', () => {
    render(<FaqPage />)
    expect(
      screen.getByRole('heading', { name: /What if I have to cancel my session/i })
    ).toBeInTheDocument()
  })

  it('renders the 48-hour cancellation policy', () => {
    render(<FaqPage />)
    expect(screen.getByText(/48 hours notice/)).toBeInTheDocument()
  })
})
