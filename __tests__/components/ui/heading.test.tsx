import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Heading } from '@/components/ui/heading'

describe('Heading Component', () => {
  it('should render h1 by default', () => {
    render(<Heading>Default Heading</Heading>)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })

  it('should render h2 when level is 2', () => {
    render(<Heading level={2}>H2 Heading</Heading>)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()
  })

  it('should render h3 when level is 3', () => {
    render(<Heading level={3}>H3 Heading</Heading>)
    const heading = screen.getByRole('heading', { level: 3 })
    expect(heading).toBeInTheDocument()
  })

  it('should apply correct sizing for h1', () => {
    render(<Heading level={1}>Large Heading</Heading>)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading.className).toContain('text-4xl')
  })

  it('should apply correct sizing for h2', () => {
    render(<Heading level={2}>Medium Heading</Heading>)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading.className).toContain('text-3xl')
  })

  it('should apply correct sizing for h3', () => {
    render(<Heading level={3}>Small Heading</Heading>)
    const heading = screen.getByRole('heading', { level: 3 })
    expect(heading.className).toContain('text-2xl')
  })

  it('should apply deep-sapphire color by default', () => {
    render(<Heading>Colored Heading</Heading>)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading.className).toContain('text-deep-sapphire')
  })

  it('should accept additional className prop', () => {
    render(<Heading className="custom-heading">Heading</Heading>)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading.className).toContain('custom-heading')
  })
})
