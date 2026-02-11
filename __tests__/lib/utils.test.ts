import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn() utility', () => {
    it('should merge class names', () => {
        expect(cn('text-red-500', 'bg-blue-500')).toBe('text-red-500 bg-blue-500')
    })

    it('should handle conditional classes', () => {
        expect(cn('base', true && 'included', false && 'excluded')).toBe('base included')
    })

    it('should resolve Tailwind conflicts with correct precedence', () => {
        // Later classes should override earlier ones
        expect(cn('px-2', 'px-4')).toBe('px-4')
        expect(cn('text-sm', 'text-lg')).toBe('text-lg')
    })

    it('should handle undefined and null gracefully', () => {
        expect(cn('base', undefined, null, 'added')).toBe('base added')
    })

    it('should handle arrays of classes', () => {
        const result = cn(['text-red-500', 'font-bold'], 'mt-4')
        expect(result).toContain('text-red-500')
        expect(result).toContain('font-bold')
        expect(result).toContain('mt-4')
    })

    it('should handle complex Tailwind precedence scenarios', () => {
        // Test conflicting padding utilities - p-2 is overridden by p-4
        expect(cn('p-2', 'p-4')).toBe('p-4')
        // Test background color precedence with modifiers
        expect(cn('bg-red-500', 'hover:bg-blue-500', 'bg-green-500')).toBe(
            'hover:bg-blue-500 bg-green-500'
        )
    })

    it('should deduplicate identical classes', () => {
        expect(cn('text-red-500', 'text-red-500')).toBe('text-red-500')
    })

    it('should handle empty inputs', () => {
        expect(cn()).toBe('')
        expect(cn('')).toBe('')
        expect(cn('', '')).toBe('')
    })

    it('should handle mixed types and complex conditions', () => {
        const isActive = true
        const isDisabled = false
        const customClass = 'custom-class'

        expect(cn('base-class', isActive && 'active', isDisabled && 'disabled', customClass)).toBe(
            'base-class active custom-class'
        )
    })
})
