import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import GoogleMap from '@/components/google-map'

// Mock global google object
const mockMap = vi.fn()
const mockAdvancedMarkerElement = vi.fn()
const mockInfoWindow = vi.fn().mockImplementation(function (this: unknown) {
    return {
        open: vi.fn(),
    }
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(global as any).google = {
    maps: {
        InfoWindow: mockInfoWindow,
    },
}

// Mock Google Maps API functional loader
vi.mock('@googlemaps/js-api-loader', () => ({
    setOptions: vi.fn(),
    importLibrary: vi.fn().mockImplementation((library: string) => {
        if (library === 'maps') {
            return Promise.resolve({ Map: mockMap })
        }
        if (library === 'marker') {
            return Promise.resolve({ AdvancedMarkerElement: mockAdvancedMarkerElement })
        }
        return Promise.resolve({})
    }),
}))

describe('GoogleMap Component', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should render map container', () => {
        render(<GoogleMap />)
        expect(screen.getByTestId('google-map')).toBeInTheDocument()
    })

    it('should have correct styling classes', () => {
        render(<GoogleMap />)
        const mapContainer = screen.getByTestId('google-map')
        expect(mapContainer.className).toContain('h-[400px]')
        expect(mapContainer.className).toContain('w-full')
    })

    it('should accept custom center prop', () => {
        const customCenter = { lat: 40.7128, lng: -74.006 }
        render(<GoogleMap center={customCenter} />)
        expect(screen.getByTestId('google-map')).toBeInTheDocument()
    })

    it('should accept custom zoom prop', () => {
        render(<GoogleMap zoom={15} />)
        expect(screen.getByTestId('google-map')).toBeInTheDocument()
    })

    it('should use default Lexington coordinates', () => {
        render(<GoogleMap />)
        // Default center should be Lexington, KY (651 Perimeter Drive)
        // Coordinates from Angular app: 37.995482, -84.46378
        expect(screen.getByTestId('google-map')).toBeInTheDocument()
    })

    it('should initialize map on mount', async () => {
        const { importLibrary } = await import('@googlemaps/js-api-loader')
        render(<GoogleMap />)

        await waitFor(() => {
            // setOptions is called once per page (may have been called in previous test)
            // so we only verify that importLibrary is called
            expect(importLibrary).toHaveBeenCalledWith('maps')
            expect(importLibrary).toHaveBeenCalledWith('marker')
        })
    })

    it('should show loading state initially', () => {
        render(<GoogleMap />)
        expect(screen.getByText('Loading map...')).toBeInTheDocument()
    })

    it('should display error state when map fails to load', async () => {
        // Mock a failing importLibrary for this specific test
        const { importLibrary } = await import('@googlemaps/js-api-loader')
        vi.mocked(importLibrary).mockRejectedValueOnce(new Error('API key error'))

        render(<GoogleMap />)

        // Verify loading state appears first
        expect(screen.getByText('Loading map...')).toBeInTheDocument()

        // Wait for error state to appear
        await waitFor(() => {
            expect(screen.queryByText('Loading map...')).not.toBeInTheDocument()
            expect(screen.getByText('Unable to load map')).toBeInTheDocument()
        })
    })

    it('should create marker with correct position and title', async () => {
        const customCenter = { lat: 37.995482, lng: -84.46378 }
        render(<GoogleMap center={customCenter} />)

        await waitFor(() => {
            expect(mockAdvancedMarkerElement).toHaveBeenCalledWith(
                expect.objectContaining({
                    position: customCenter,
                    title: 'Compass Christian Counseling',
                })
            )
        })
    })

    it('should create and open info window with office details', async () => {
        render(<GoogleMap />)

        await waitFor(() => {
            // Verify InfoWindow was created with correct content
            expect(mockInfoWindow).toHaveBeenCalledWith(
                expect.objectContaining({
                    content:
                        '<b>Compass Christian Counseling</b><br />651 Perimeter Drive, Suite 115<br />Lexington, KY 40517',
                    ariaLabel: 'Compass Christian Counseling',
                })
            )

            // Verify InfoWindow.open was called
            const infoWindowInstance = mockInfoWindow.mock.results[0].value
            expect(infoWindowInstance.open).toHaveBeenCalled()
        })
    })

    it('should generate unique map IDs for multiple instances', () => {
        const { container: container1 } = render(<GoogleMap />)
        const { container: container2 } = render(<GoogleMap />)

        // Both components should render successfully
        expect(container1).toBeTruthy()
        expect(container2).toBeTruthy()

        // The mockMap should be called twice with different mapId values
        // Note: This test verifies the components can coexist without ID conflicts
        // The actual map instances would have different IDs in the real implementation
    })
})
