import { describe, it, expect } from 'vitest'
import type { Counselor, Newsletter, CounselorData, NewsletterData } from '@/types/models'

describe('Type Definitions', () => {
    describe('Counselor Interface', () => {
        it('should accept valid Counselor object', () => {
            const counselor: Counselor = {
                appointmentLink: 'https://example.com',
                credentials: ['MA', 'LPC'],
                directoryId: '123',
                email: 'test@example.com',
                firstName: 'John',
                insurance: ['Aetna', 'Humana'],
                lastName: 'Doe',
                longDescription: ['Long description here'],
                memberships: ['ACA', 'AACC'],
                phone: '555-1234',
                practitionerId: '1',
                shortDescription: 'Short description',
                title: 'MA, LPC',
                id: '1',
            }
            expect(counselor).toBeDefined()
            expect(counselor.firstName).toBe('John')
        })

        it('should enforce required fields', () => {
            // This test verifies TypeScript compilation would fail for missing fields
            // In runtime, we verify the shape is correct
            const counselor: Counselor = {
                appointmentLink: '',
                credentials: [],
                directoryId: '',
                email: '',
                firstName: '',
                insurance: [],
                lastName: '',
                longDescription: [],
                memberships: [],
                phone: '',
                practitionerId: '',
                shortDescription: '',
                title: '',
                id: '',
            }
            expect(counselor).toBeDefined()
        })
    })

    describe('Newsletter Interface', () => {
        it('should accept valid Newsletter object', () => {
            const newsletter: Newsletter = {
                description: 'Newsletter description',
                id: '1',
                quarter: 'Q1',
                title: 'Spring Newsletter',
                year: '2024',
            }
            expect(newsletter).toBeDefined()
            expect(newsletter.title).toBe('Spring Newsletter')
        })

        it('should allow null description', () => {
            const newsletter: Newsletter = {
                description: null,
                id: '2',
                quarter: 'Q2',
                title: 'Summer Newsletter',
                year: '2024',
            }
            expect(newsletter).toBeDefined()
            expect(newsletter.description).toBeNull()
        })
    })

    describe('CounselorData Interface', () => {
        it('should contain counselorList array', () => {
            const data: CounselorData = {
                counselorList: [],
            }
            expect(data.counselorList).toEqual([])
        })
    })

    describe('NewsletterData Interface', () => {
        it('should contain newsletterList array', () => {
            const data: NewsletterData = {
                newsletterList: [],
            }
            expect(data.newsletterList).toEqual([])
        })
    })
})
