'use client'

import { useState, useEffect } from 'react'

const IMAGES = [
    '/assets/slider-images/slider-image-1.jpg',
    '/assets/slider-images/slider-image-2.jpg',
    '/assets/slider-images/slider-image-3.jpg',
    '/assets/slider-images/slider-image-4.jpg',
    '/assets/slider-images/slider-image-5.jpg',
]

const ROTATION_INTERVAL_MS = 5000

/**
 * Auto-rotating hero image banner for the home page.
 * Cycles through 5 background images with a text overlay.
 * Matches Angular home-page-rotator styling with scale animation and responsive text positioning.
 */
export default function HomePageRotator() {
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % IMAGES.length)
        }, ROTATION_INTERVAL_MS)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="home-page-rotator">
            <p className="rotator-text">Sometimes you just need a little help along the way</p>
            {IMAGES.map((src, index) => (
                <div
                    key={src}
                    className={['rotator-item', index === activeIndex ? 'active' : '']
                        .join(' ')
                        .trim()}
                    style={{ backgroundImage: `url(${src})` }}
                    aria-hidden={index !== activeIndex}
                />
            ))}
        </div>
    )
}
