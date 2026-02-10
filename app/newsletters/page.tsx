import type { Metadata } from 'next'
import { newsletterRepository } from '@/services/data-repository'
import NewsletterCard from '@/components/newsletter-card'
import { Heading } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Compass Articles - Compass Christian Counseling',
  description:
    'Articles from Compass Christian Counseling covering coping strategies for stress, relationship skills, and mental and emotional well-being.',
}

export default async function NewslettersPage() {
  const newsletters = await newsletterRepository.getAllNewsletters()
  // Sort newest first (by year desc, quarter desc)
  const sorted = [...newsletters].sort((a, b) => {
    const yearDiff = parseInt(b.year) - parseInt(a.year)
    if (yearDiff !== 0) return yearDiff
    return parseInt(b.quarter) - parseInt(a.quarter)
  })

  return (
    <div className="max-w-site mx-auto px-4 py-8">
      <Heading level={2}>Compass Articles</Heading>
      <p className="text-deep-sapphire mb-8 text-base">
        Compass Christian Counseling Articles cover a variety of topics including coping strategies
        for stress, relationship skills, and mental and emotional well-being.
      </p>

      {sorted.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {sorted.map((newsletter) => (
            <NewsletterCard key={newsletter.id} newsletter={newsletter} />
          ))}
        </div>
      )}
    </div>
  )
}
