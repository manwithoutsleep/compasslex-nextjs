import Link from 'next/link'
import { Heading } from '@/components/ui'

export default function NotFound() {
    return (
        <div className="max-w-site mx-auto">
            <Heading level={2}>Page Not Found</Heading>
            <div className="mb-8 p-4 text-center">
                <p className="mb-8">Sorry, the page you are looking for does not exist.</p>
                <Link
                    href="/"
                    className="bg-deep-sapphire text-polar-mist hover:bg-royal-indigo rounded px-6 py-3 no-underline transition-colors duration-500 ease-in-out"
                >
                    Return Home
                </Link>
            </div>
        </div>
    )
}
