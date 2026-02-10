'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

/**
 * Navigation link configuration
 */
const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/meet-us', label: 'Meet Us' },
  { href: '/our-services', label: 'Our Services' },
  { href: '/faq', label: 'FAQ' },
  { href: '/resources', label: 'Resources' },
  { href: '/contact-us', label: 'Contact Us' },
] as const

type NavigationProps =
  | { variant: 'desktop' }
  | { variant: 'mobile'; isOpen: boolean; onClose: () => void }

/**
 * Navigation component with responsive desktop and mobile layouts
 *
 * Desktop variant:
 * - Rendered within header component
 * - Horizontal navigation menu
 *
 * Mobile variant:
 * - Slide-out sidenav overlay from left
 * - Dark backdrop
 * - Positioned below fixed header
 */
export default function Navigation(props: NavigationProps) {
  const pathname = usePathname()

  // Desktop Navigation
  if (props.variant === 'desktop') {
    return (
      <nav className="hidden h-[75px] flex-row flex-wrap items-end justify-around p-[9px_0] font-bold min-[600px]:flex">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-deep-sapphire px-1 text-[1.3em] whitespace-nowrap transition-all duration-300 ease-in-out hover:cursor-pointer hover:[text-shadow:white_0_0_3px,#aaaaff_0_0_5px,#191248_0_0_25px] ${
              pathname === link.href ? 'font-bold' : 'font-normal'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    )
  }

  // Mobile Navigation - Sidenav Overlay
  const { isOpen, onClose } = props
  return (
    <>
      {/* Backdrop — visual only; menu is dismissed via the hamburger button */}
      <div
        aria-hidden="true"
        className={`fixed top-0 left-0 z-[1050] h-screen w-screen bg-black/60 transition-opacity duration-300 ease-in-out min-[600px]:hidden ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Sidenav */}
      <nav
        id="mobile-sidenav"
        className={`bg-bengal-blue fixed top-[60px] left-0 z-[1100] h-[calc(100vh-60px)] w-[155px] shadow-[0_8px_10px_-5px_rgba(0,0,0,0.2),0_16px_24px_2px_rgba(0,0,0,0.14),0_6px_30px_5px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-in-out min-[600px]:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="pt-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-deep-sapphire box-border flex h-12 flex-row px-4 py-3.5 text-left text-[1.3em] leading-5 font-bold no-underline transition-colors hover:bg-black/[0.04]"
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  )
}
