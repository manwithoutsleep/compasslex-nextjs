'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { setOptions, importLibrary } from '@googlemaps/js-api-loader'

// Initialize Google Maps API options once at module level (browser only)
// This is an exception to the "no module-level state in client components" rule because:
// 1. The Google Maps API requires setOptions() to be called exactly once globally
// 2. This is immutable configuration, not mutable state (no counters, flags, or changing values)
// 3. Similar to other SDK initialization patterns (Sentry, analytics, etc.)
// 4. Prevents console warnings: "The setOptions() function should only be called once"
// 5. Test isolation is preserved via mocking
// See PR #7 discussion on module-level state vs. one-time configuration
// Note: Check for browser environment to prevent SSR errors during build
if (typeof window !== 'undefined') {
    setOptions({
        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        v: 'weekly',
    })
}

interface GoogleMapProps {
    center?: { lat: number; lng: number }
    zoom?: number
    className?: string
    height?: string
    maxWidth?: string
    testId?: string
    ariaLabel?: string
}

/**
 * Google Maps component displaying Compass Christian Counseling office location
 * Client component required for interactive map functionality
 *
 * Configuration matches Angular implementation:
 * - Address: 651 Perimeter Drive, Suite 115, Lexington, KY 40517
 * - Uses AdvancedMarkerElement for modern marker rendering
 * - Info window opens automatically with office details
 */
export default function GoogleMap({
    center = { lat: 37.995482, lng: -84.46378 }, // Lexington, KY - 651 Perimeter Drive
    zoom = 14,
    className = '',
    height = 'h-[400px]',
    maxWidth = 'max-w-[404px]',
    testId = 'google-map',
    ariaLabel = 'Interactive map showing Compass Christian Counseling office location at 651 Perimeter Drive, Lexington, KY',
}: GoogleMapProps) {
    const mapRef = useRef<HTMLDivElement>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Generate unique map ID using React's useId hook
    // useId() returns a stable value, so no need for useRef
    const reactId = useId()
    const mapId = `CompassMapId-${reactId.replace(/:/g, '-')}`

    useEffect(() => {
        // Track component mount state to prevent state updates after unmount
        let cancelled = false

        // Store references for cleanup
        let mapInstance: google.maps.Map | null = null
        let markerInstance: google.maps.marker.AdvancedMarkerElement | null = null
        let infoWindowInstance: google.maps.InfoWindow | null = null

        // Load map and marker libraries
        Promise.all([importLibrary('maps'), importLibrary('marker')])
            .then(async ([mapsLib, markerLib]) => {
                if (cancelled) return

                if (!mapRef.current) {
                    setError('Map container not ready')
                    setIsLoading(false)
                    return
                }

                const { Map } = mapsLib as google.maps.MapsLibrary
                const { AdvancedMarkerElement } = markerLib as google.maps.MarkerLibrary

                // Create map with cooperative gesture handling
                mapInstance = new Map(mapRef.current, {
                    center,
                    zoom,
                    mapId, // Unique ID required for AdvancedMarkerElement
                    gestureHandling: 'cooperative',
                })

                // Office information
                const title = 'Compass Christian Counseling'
                const content =
                    '<b>Compass Christian Counseling</b><br />651 Perimeter Drive, Suite 115<br />Lexington, KY 40517'

                // Add advanced marker for office location
                markerInstance = new AdvancedMarkerElement({
                    map: mapInstance,
                    position: center,
                    title,
                })

                // Create and open info window
                infoWindowInstance = new google.maps.InfoWindow({
                    content,
                    ariaLabel: title,
                })

                infoWindowInstance.open({
                    anchor: markerInstance,
                    map: mapInstance,
                })

                if (!cancelled) {
                    setIsLoading(false)
                }
            })
            .catch((err: Error) => {
                if (cancelled) return

                console.error('Error loading Google Maps:', err)
                setError('Failed to load map')
                setIsLoading(false)
            })

        // Cleanup function
        return () => {
            cancelled = true

            // Close info window
            if (infoWindowInstance && typeof infoWindowInstance.close === 'function') {
                infoWindowInstance.close()
            }

            // Clear references to allow garbage collection
            mapInstance = null
            markerInstance = null
            infoWindowInstance = null
        }
    }, [center, zoom, mapId])

    if (error) {
        return (
            <div
                data-testid={testId}
                className={`flex ${height} w-full ${maxWidth} items-center justify-center rounded bg-gray-200 shadow-md ${className}`}
            >
                <p className="text-gray-600">Unable to load map</p>
            </div>
        )
    }

    return (
        <div className={`relative w-full ${maxWidth}`}>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center rounded bg-gray-100">
                    <p className="text-gray-600">Loading map...</p>
                </div>
            )}
            <div
                ref={mapRef}
                data-testid={testId}
                role="application"
                aria-label={ariaLabel}
                className={`${height} w-full rounded shadow-md ${className}`}
            />
        </div>
    )
}
