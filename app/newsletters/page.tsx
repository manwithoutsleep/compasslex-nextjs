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
    const sorted = await newsletterRepository.getAllNewslettersSorted()

    return (
        <div className="max-w-site mx-auto">
            <Heading level={2}>Compass Articles</Heading>
            <div className="p-4">
                <p className="mb-8 text-center text-base">
                    Compass Christian Counseling Articles cover a variety of topics including coping
                    strategies for stress, relationship skills, and mental and emotional well-being.
                </p>

                {sorted.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-6">
                        {sorted.map((newsletter) => (
                            <NewsletterCard key={newsletter.id} newsletter={newsletter} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
