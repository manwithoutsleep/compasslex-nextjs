import Link from 'next/link'
import { Heading } from '@/components/ui'

export default function NotFound() {
  return (
    <div className="max-w-site mx-auto px-4 py-16 text-center">
      <Heading level={2}>Page Not Found</Heading>
      <p className="text-deep-sapphire mb-8">Sorry, the page you are looking for does not exist.</p>
      <Link
        href="/"
        className="bg-deep-sapphire text-polar-mist hover:bg-royal-indigo rounded px-6 py-3 font-medium"
      >
        Return Home
      </Link>
    </div>
  )
}
