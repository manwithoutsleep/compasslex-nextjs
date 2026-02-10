import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HomePage from '@/app/page'

describe('Home Page', () => {
  it('renders the rotator heading text', () => {
    render(<HomePage />)
    expect(
      screen.getByText('Sometimes you just need a little help along the way')
    ).toBeInTheDocument()
  })

  it('renders the intro paragraph about Compass Christian Counseling', () => {
    render(<HomePage />)
    expect(
      screen.getByText(
        /At Compass Christian Counseling our goal is to provide a safe and supportive/
      )
    ).toBeInTheDocument()
  })

  it('renders a Meet Us section with link', () => {
    render(<HomePage />)
    const meetUsLink = screen.getByRole('link', { name: /Meet Us/i })
    expect(meetUsLink).toBeInTheDocument()
    expect(meetUsLink).toHaveAttribute('href', '/meet-us')
  })

  it('renders an Our Services section with link', () => {
    render(<HomePage />)
    const link = screen.getByRole('link', { name: /Our Services/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/our-services')
  })

  it('renders a FAQ section with link', () => {
    render(<HomePage />)
    const link = screen.getByRole('link', { name: /FAQ/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/faq')
  })

  it('renders a Resources section with link', () => {
    render(<HomePage />)
    const link = screen.getByRole('link', { name: /Resources/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/resources')
  })

  it('renders a Contact Us section with link', () => {
    render(<HomePage />)
    const link = screen.getByRole('link', { name: /Contact Us/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/contact-us')
  })
})
