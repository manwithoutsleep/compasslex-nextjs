import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'

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
        <Header />
        {/* Add top margin on mobile to account for fixed header */}
        <main className="max-w-site mx-auto mt-[60px] px-4 min-[600px]:mt-0">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
