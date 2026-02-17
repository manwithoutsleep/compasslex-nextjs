import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// Mock Next.js font loading
vi.mock('next/font/google', () => ({
    Roboto: () => ({
        className: 'roboto-font-class',
    }),
}))
