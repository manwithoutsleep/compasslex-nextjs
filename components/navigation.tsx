'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

/**
 * Navigation link configuration
 */
const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/meet-us', label: 'Meet Us' },
  { href: '/our-services', label: 'Our Services' },
  { href: '/faq', label: 'FAQ' },
  { href: '/getting-started', label: 'Getting Started' },
  { href: '/resources', label: 'Resources' },
  { href: '/contact-us', label: 'Contact Us' },
] as const

/**
 * Navigation component with responsive desktop and mobile layouts
 *
 * Features:
 * - Desktop: Horizontal navigation menu
 * - Mobile: Hamburger menu with toggle
 * - Active link highlighting
 * - Accessible keyboard navigation
 */
export default function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-pure-white text-deep-sapphire">
      <div className="max-w-site mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden flex-wrap gap-x-8 gap-y-2 py-4 min-[600px]:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[1.3em] whitespace-nowrap transition-all duration-300 ease-in-out hover:cursor-pointer hover:[text-shadow:white_0_0_3px,#aaaaff_0_0_5px,#191248_0_0_25px] ${
                pathname === link.href ? 'font-bold' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="py-4 min-[600px]:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-deep-sapphire transition-all duration-300 ease-in-out hover:cursor-pointer hover:[text-shadow:white_0_0_3px,#aaaaff_0_0_5px,#191248_0_0_25px]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? '✕ Close' : '☰ Menu'}
          </button>
          {mobileMenuOpen && (
            <div className="mt-4 flex flex-col space-y-2 pb-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[1.3em] whitespace-nowrap transition-all duration-300 ease-in-out hover:cursor-pointer hover:[text-shadow:white_0_0_3px,#aaaaff_0_0_5px,#191248_0_0_25px] ${
                    pathname === link.href ? 'font-bold' : ''
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
