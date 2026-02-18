import '@testing-library/jest-dom/vitest'
import { vi, beforeAll, afterAll } from 'vitest'

// Mock Next.js font loading
vi.mock('next/font/google', () => ({
    Roboto: () => ({
        className: 'roboto-font-class',
    }),
}))

// Suppress expected React warnings when testing Next.js layouts
// RootLayout components return <html> elements, which Testing Library wraps in <div>
// This creates invalid HTML structure in tests but is harmless
const originalError = console.error
beforeAll(() => {
    console.error = (...args: unknown[]) => {
        const message = typeof args[0] === 'string' ? args[0] : ''

        // Suppress expected layout testing warning
        if (message.includes('In HTML, <html> cannot be a child of <div>')) {
            return
        }

        // Suppress hydration error warning (consequence of the above)
        if (message.includes('This will cause a hydration error')) {
            return
        }

        // Allow all other errors through
        originalError.call(console, ...args)
    }
})

afterAll(() => {
    console.error = originalError
})
