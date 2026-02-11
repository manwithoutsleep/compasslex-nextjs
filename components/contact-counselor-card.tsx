import Image from 'next/image'
import type { Counselor } from '@/types/models'

interface ContactCounselorCardProps {
    counselor: Counselor
}

/**
 * Displays a compact counselor contact card with photo, name, phone, email, and appointment link.
 * Matches the Angular contact-counselor-card component layout.
 */
export default function ContactCounselorCard({ counselor }: ContactCounselorCardProps) {
    const imageSlug = counselor.firstName.toLowerCase()
    const imageSrc = `/assets/site-images/${imageSlug}-contact-us-200x206.jpg`

    return (
        <div className="flex flex-wrap items-start justify-center gap-4 border-b border-gray-200 py-4 last:border-0">
            <div className="shrink-0">
                <Image
                    src={imageSrc}
                    alt={`${counselor.firstName} ${counselor.lastName}`}
                    width={200}
                    height={206}
                    className="rounded"
                    unoptimized
                />
            </div>
            <div className="flex min-w-[180px] flex-col gap-1">
                <p className="font-semibold">
                    {counselor.firstName} {counselor.lastName}
                </p>
                <p>{counselor.phone}</p>
                <a
                    href={`mailto:${counselor.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-royal-indigo underline"
                >
                    {counselor.email}
                </a>
                <a
                    href={counselor.appointmentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-appointment mt-1 block"
                >
                    Make an appointment
                    <br />
                    with {counselor.firstName}
                </a>
            </div>
        </div>
    )
}
