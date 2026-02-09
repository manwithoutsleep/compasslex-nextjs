import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/navigation'

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Compass Christian Counseling - Lexington, KY',
  description: 'Professional Christian counseling services in Lexington, Kentucky',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body className="bg-pure-white min-h-screen">
        <Navigation />
        <main className="max-w-site mx-auto px-4">{children}</main>
      </body>
    </html>
  )
}
