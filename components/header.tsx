'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Navigation from '@/components/navigation'

/**
 * Header component with desktop and mobile layouts
 *
 * Desktop features:
 * - Logo and branding
 * - Phone number
 * - "Make an Appointment" button
 * - Navigation menu (horizontal)
 *
 * Mobile features:
 * - Fixed header bar (60px height)
 * - Hamburger menu button
 * - Logo and icon
 * - Navigation sidenav (slide-out overlay)
 */
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const [prevPathname, setPrevPathname] = useState(pathname)

  // Close mobile menu on route change (during render, not in an effect)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname)
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header className="bg-pure-white max-w-site fixed top-0 z-[1200] mx-auto h-[60px] w-full shadow-[0_2px_4px_-1px_rgba(0,0,0,0.2),0_4px_5px_0_rgba(0,0,0,0.14),0_1px_10px_0_rgba(0,0,0,0.12)] min-[600px]:relative min-[600px]:h-auto">
        {/* Mobile Header - Fixed at top */}
        <div className="m-0 flex h-[60px] flex-row items-center justify-between px-2 min-[600px]:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-none bg-transparent transition-colors hover:bg-black/[0.04]"
            aria-label="Toggle menu"
          >
            <span className="text-2xl">{mobileMenuOpen ? '✕' : '☰'}</span>
          </button>
          <Link href="/" className="flex">
            <Image
              src="/assets/site-images/CompassLogoSmall.png"
              alt="Compass Christian Counseling"
              width={217}
              height={60}
              priority
            />
          </Link>
          <Link href="/" className="flex">
            <Image
              src="/assets/site-images/CompassIconSmall.png"
              alt="Compass Christian Counseling"
              width={48}
              height={60}
              priority
            />
          </Link>
        </div>

        {/* Desktop Header */}
        <div className="hidden h-[142px] flex-row justify-between p-3 min-[600px]:flex">
          <h1 className="m-0 flex items-center bg-transparent">
            <Link href="/" className="m-0 flex border-0 bg-transparent p-0 text-[0em]">
              <Image
                src="/assets/site-images/CompassLogoAndIcon.png"
                alt="Compass Christian Counseling"
                width={271}
                height={116}
                priority
              />
            </Link>
          </h1>
          <div className="flex flex-grow-[4] flex-col">
            {/* Contact Info */}
            <div className="flex flex-row flex-wrap justify-around px-8 text-center leading-[50px]">
              <div>(859) 721-3259</div>
              <Link
                href="/contact-us"
                className="bg-deep-sapphire text-polar-mist cursor-pointer self-center px-4 leading-normal no-underline transition-opacity hover:opacity-90"
              >
                Make an Appointment
              </Link>
            </div>
            {/* Navigation Menu - Desktop */}
            <Navigation isMobile={false} />
          </div>
        </div>
      </header>

      {/* Mobile Navigation Sidenav */}
      <Navigation
        isMobile={true}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  )
}
