import Image from 'next/image'
import type { Newsletter } from '@/types/models'

interface NewsletterCardProps {
    newsletter: Newsletter
}

export default function NewsletterCard({ newsletter }: NewsletterCardProps) {
    const fileBase = `CompassNewsletter${newsletter.year}Q${newsletter.quarter}`
    const pdfHref = `/assets/newsletters/${fileBase}.pdf`
    const imageSrc = `/assets/newsletters/${fileBase}.png`

    return (
        <a
            href={pdfHref}
            target="_blank"
            rel="noopener noreferrer"
            className="border-deep-sapphire block rounded border-3 shadow-md"
        >
            <Image
                src={imageSrc}
                alt={newsletter.title}
                width={280}
                height={266}
                className="rounded p-1"
                unoptimized
            />
        </a>
    )
}
