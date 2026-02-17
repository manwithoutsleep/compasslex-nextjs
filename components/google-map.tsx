'use client'

import { useEffect, useRef, useState } from 'react'
import { setOptions, importLibrary } from '@googlemaps/js-api-loader'

interface GoogleMapProps {
    center?: { lat: number; lng: number }
    zoom?: number
    className?: string
}

// Track if setOptions has been called to prevent multiple calls
let optionsSet = false

// Counter for generating unique map IDs
let mapIdCounter = 0

/**
 * Initialize Google Maps API options (call once per page)
 */
function initializeGoogleMaps() {
    if (!optionsSet) {
        setOptions({
            key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
            v: 'weekly',
        })
        optionsSet = true
    }
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
}: GoogleMapProps) {
    const mapRef = useRef<HTMLDivElement>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    // Generate unique map ID for this instance
    const mapId = useRef(`CompassMapId-${++mapIdCounter}`).current

    useEffect(() => {
        // Initialize API options once
        initializeGoogleMaps()

        // Load map and marker libraries
        Promise.all([importLibrary('maps'), importLibrary('marker')])
            .then(async ([mapsLib, markerLib]) => {
                if (!mapRef.current) {
                    setError('Map container not ready')
                    setIsLoading(false)
                    return
                }

                const { Map } = mapsLib as google.maps.MapsLibrary
                const { AdvancedMarkerElement } = markerLib as google.maps.MarkerLibrary

                // Create map with cooperative gesture handling
                const map = new Map(mapRef.current, {
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
                const marker = new AdvancedMarkerElement({
                    map,
                    position: center,
                    title,
                })

                // Create and open info window
                const infoWindow = new google.maps.InfoWindow({
                    content,
                    ariaLabel: title,
                })

                infoWindow.open({
                    anchor: marker,
                    map,
                })

                setIsLoading(false)
            })
            .catch((err: Error) => {
                console.error('Error loading Google Maps:', err)
                setError('Failed to load map')
                setIsLoading(false)
            })
    }, [center, zoom, mapId])

    if (error) {
        return (
            <div
                data-testid="google-map"
                className={`flex h-[400px] w-full max-w-[404px] items-center justify-center rounded bg-gray-200 shadow-md ${className}`}
            >
                <p className="text-gray-600">Unable to load map</p>
            </div>
        )
    }

    return (
        <div className="relative w-full max-w-[404px]">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center rounded bg-gray-100">
                    <p className="text-gray-600">Loading map...</p>
                </div>
            )}
            <div
                ref={mapRef}
                data-testid="google-map"
                className={`h-[400px] w-full rounded shadow-md ${className}`}
            />
        </div>
    )
}
