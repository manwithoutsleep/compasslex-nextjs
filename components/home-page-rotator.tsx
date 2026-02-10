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
    <div className="relative h-64 w-full overflow-hidden md:h-96">
      {IMAGES.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${src})` }}
          aria-hidden={index !== activeIndex}
        />
      ))}
      <div className="bg-deep-sapphire/40 absolute inset-0 flex items-center justify-center">
        <p className="text-polar-mist px-4 text-center text-xl font-bold md:text-3xl">
          Sometimes you just need a little help along the way
        </p>
      </div>
    </div>
  )
}
