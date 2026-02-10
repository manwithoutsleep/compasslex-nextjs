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
    <div className="flex items-start gap-4 border-b border-gray-200 py-4 last:border-0">
      <div className="shrink-0">
        <Image
          src={imageSrc}
          alt={`${counselor.firstName} ${counselor.lastName}`}
          width={100}
          height={103}
          className="rounded"
          unoptimized
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-deep-sapphire font-semibold">
          {counselor.firstName} {counselor.lastName}
        </p>
        <p className="text-sm text-gray-700">{counselor.phone}</p>
        <a
          href={`mailto:${counselor.email}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-deep-sapphire hover:text-royal-indigo text-sm"
        >
          {counselor.email}
        </a>
        <a
          href={counselor.appointmentLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-deep-sapphire text-polar-mist hover:bg-royal-indigo mt-1 inline-block rounded px-3 py-1 text-sm"
        >
          Make an appointment
          <br />
          with {counselor.firstName}
        </a>
      </div>
    </div>
  )
}
