import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ResourcesPage from '@/app/resources/page'

describe('Resources Page', () => {
    it('renders the page heading', () => {
        render(<ResourcesPage />)
        expect(screen.getByRole('heading', { name: /Resources/i })).toBeInTheDocument()
    })

    it('renders Crisis Contacts section', () => {
        render(<ResourcesPage />)
        expect(screen.getByText(/Crisis Contacts/i)).toBeInTheDocument()
    })

    it('renders suicide hotline', () => {
        render(<ResourcesPage />)
        expect(screen.getByText(/SUICIDE HOTLINE/i)).toBeInTheDocument()
        expect(screen.getByText('1-800-SUICIDE')).toBeInTheDocument()
    })

    it('renders sexual assault hotline', () => {
        render(<ResourcesPage />)
        expect(screen.getByText(/Sexual Assault Hotline/i)).toBeInTheDocument()
        expect(screen.getByText('1-800-656-HOPE')).toBeInTheDocument()
    })

    it('renders Quick Self-Assessments section with PDF links', () => {
        render(<ResourcesPage />)
        expect(screen.getByText(/Quick Self-Assessments/i)).toBeInTheDocument()
        const addictionLink = screen.getByRole('link', { name: /Am I addicted/i })
        expect(addictionLink).toHaveAttribute('href', '/assets/pdf/CompassAddiction.pdf')
        expect(addictionLink).toHaveAttribute('target', '_blank')
    })

    it('renders Good Reads section with book PDF links', () => {
        render(<ResourcesPage />)
        expect(screen.getByText(/Good Reads/i)).toBeInTheDocument()
        const eatingLink = screen.getByRole('link', { name: /Eating Disorders/i })
        expect(eatingLink).toHaveAttribute('href', '/assets/pdf/GoodReadsEatingDisorders.pdf')
    })

    it('renders Compass Articles link to newsletters', () => {
        render(<ResourcesPage />)
        const articlesLink = screen.getByRole('link', { name: /See articles here/i })
        expect(articlesLink).toHaveAttribute('href', '/newsletters')
    })
})
