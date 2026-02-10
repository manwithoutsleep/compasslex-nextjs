import Image from 'next/image'
import { Card, CardBody } from '@/components/ui'
import type { Newsletter } from '@/types/models'

interface NewsletterCardProps {
  newsletter: Newsletter
}

/**
 * Displays a newsletter card with image, title, quarter/year, and PDF download link.
 * Matches the Angular newsletter component layout.
 */
export default function NewsletterCard({ newsletter }: NewsletterCardProps) {
  const fileBase = `CompassNewsletter${newsletter.year}Q${newsletter.quarter}`
  const pdfHref = `/assets/newsletters/${fileBase}.pdf`
  const imageSrc = `/assets/newsletters/${fileBase}.png`

  return (
    <Card>
      <CardBody>
        <a href={pdfHref} target="_blank" rel="noopener noreferrer">
          <Image
            src={imageSrc}
            alt={newsletter.title}
            width={200}
            height={260}
            className="mb-3 w-full rounded"
            unoptimized
          />
        </a>
        <h3 className="text-deep-sapphire mb-1 text-base font-semibold">{newsletter.title}</h3>
        <p className="text-raspberry-smoothie mb-2 text-sm">
          {newsletter.year} &mdash; Q{newsletter.quarter}
        </p>
        <a
          href={pdfHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-deep-sapphire hover:text-royal-indigo text-sm font-medium"
        >
          Download PDF
        </a>
      </CardBody>
    </Card>
  )
}
