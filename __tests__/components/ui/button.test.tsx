import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/ui/button'

describe('Button Component', () => {
    it('should render button text', () => {
        render(<Button>Click Me</Button>)
        expect(screen.getByRole('button', { name: 'Click Me' })).toBeInTheDocument()
    })

    it('should handle click events', async () => {
        const handleClick = vi.fn()
        const user = userEvent.setup()

        render(<Button onClick={handleClick}>Click Me</Button>)

        await user.click(screen.getByRole('button'))
        expect(handleClick).toHaveBeenCalledOnce()
    })

    it('should apply primary variant styling', () => {
        render(<Button variant="primary">Primary</Button>)
        const button = screen.getByRole('button')

        expect(button.className).toContain('bg-deep-sapphire')
    })

    it('should apply secondary variant styling', () => {
        render(<Button variant="secondary">Secondary</Button>)
        const button = screen.getByRole('button')

        expect(button.className).toContain('bg-warm-sand')
    })

    it('should apply outline variant styling', () => {
        render(<Button variant="outline">Outline</Button>)
        const button = screen.getByRole('button')

        expect(button.className).toContain('border')
        expect(button.className).toContain('bg-transparent')
    })

    it('should accept additional className prop', () => {
        render(<Button className="custom-button">Button</Button>)
        const button = screen.getByRole('button')

        expect(button.className).toContain('custom-button')
    })

    it('should support disabled state', () => {
        render(<Button disabled>Disabled</Button>)
        const button = screen.getByRole('button')

        expect(button).toBeDisabled()
        expect(button.className).toContain('opacity-50')
    })

    it('should support type prop', () => {
        render(<Button type="submit">Submit</Button>)
        const button = screen.getByRole('button')

        expect(button).toHaveAttribute('type', 'submit')
    })

    // Integration Tests
    describe('Keyboard Accessibility', () => {
        it('should be keyboard accessible with Enter key', async () => {
            const handleClick = vi.fn()
            const user = userEvent.setup()

            render(<Button onClick={handleClick}>Click</Button>)
            const button = screen.getByRole('button')

            button.focus()
            await user.keyboard('{Enter}')
            expect(handleClick).toHaveBeenCalledOnce()
        })

        it('should be keyboard accessible with Space key', async () => {
            const handleClick = vi.fn()
            const user = userEvent.setup()

            render(<Button onClick={handleClick}>Click</Button>)
            const button = screen.getByRole('button')

            button.focus()
            await user.keyboard(' ')
            expect(handleClick).toHaveBeenCalledOnce()
        })

        it('should be focusable with Tab key', async () => {
            const user = userEvent.setup()

            render(
                <>
                    <Button>First</Button>
                    <Button>Second</Button>
                </>
            )

            await user.tab()
            expect(screen.getByRole('button', { name: 'First' })).toHaveFocus()

            await user.tab()
            expect(screen.getByRole('button', { name: 'Second' })).toHaveFocus()
        })
    })

    describe('Disabled State Interaction', () => {
        it('should not call onClick when disabled and clicked', async () => {
            const handleClick = vi.fn()
            const user = userEvent.setup()

            render(
                <Button disabled onClick={handleClick}>
                    Click
                </Button>
            )

            await user.click(screen.getByRole('button'))
            expect(handleClick).not.toHaveBeenCalled()
        })

        it('should not respond to keyboard events when disabled', async () => {
            const handleClick = vi.fn()
            const user = userEvent.setup()

            render(
                <Button disabled onClick={handleClick}>
                    Click
                </Button>
            )
            const button = screen.getByRole('button')

            button.focus()
            await user.keyboard('{Enter}')
            await user.keyboard(' ')

            expect(handleClick).not.toHaveBeenCalled()
        })

        it('should not be focusable when disabled', async () => {
            const user = userEvent.setup()

            render(
                <>
                    <Button>First</Button>
                    <Button disabled>Disabled</Button>
                    <Button>Third</Button>
                </>
            )

            await user.tab()
            expect(screen.getByRole('button', { name: 'First' })).toHaveFocus()

            await user.tab()
            expect(screen.getByRole('button', { name: 'Third' })).toHaveFocus()
        })
    })

    describe('ARIA Attributes', () => {
        it('should have proper disabled attribute when disabled', () => {
            render(<Button disabled>Disabled</Button>)
            const button = screen.getByRole('button')

            expect(button).toHaveAttribute('disabled')
            expect(button).toBeDisabled()
        })

        it('should have proper role attribute', () => {
            render(<Button>Button</Button>)
            const button = screen.getByRole('button')

            expect(button.tagName).toBe('BUTTON')
        })

        it('should be accessible with text content', () => {
            render(<Button>Close dialog</Button>)
            const button = screen.getByRole('button', { name: 'Close dialog' })

            expect(button).toBeInTheDocument()
        })
    })

    describe('Edge Cases', () => {
        it('should handle multiple rapid clicks', async () => {
            const handleClick = vi.fn()
            const user = userEvent.setup()

            render(<Button onClick={handleClick}>Click</Button>)
            const button = screen.getByRole('button')

            await user.click(button)
            await user.click(button)
            await user.click(button)

            expect(handleClick).toHaveBeenCalledTimes(3)
        })

        it('should handle empty string children gracefully', () => {
            render(<Button>{''}</Button>)
            const button = screen.getByRole('button')

            expect(button).toBeInTheDocument()
        })

        it('should handle complex children elements', () => {
            render(
                <Button>
                    <span>Icon</span>
                    <span>Text</span>
                </Button>
            )

            const button = screen.getByRole('button')
            expect(button).toBeInTheDocument()
            expect(button.textContent).toBe('IconText')
        })
    })
})
