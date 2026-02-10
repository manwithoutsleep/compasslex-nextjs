import Link from 'next/link'
import Image from 'next/image'
import { Card, CardTitle, CardBody } from '@/components/ui'
import type { Counselor } from '@/types/models'

interface CounselorCardProps {
  counselor: Counselor
}

/**
 * Displays a counselor summary card with photo, name, titles, description, and link to detail page.
 * Matches the Angular meet-counselor-card component layout.
 */
export default function CounselorCard({ counselor }: CounselorCardProps) {
  const firstName = counselor.firstName
  const imageSlug = firstName.toLowerCase()
  const imageSrc = `/assets/site-images/${imageSlug}-meet-us-182x235.jpg`

  return (
    <Card>
      <CardTitle>Hi, I&apos;m {firstName}</CardTitle>
      <CardBody className="flex gap-4">
        <div className="shrink-0">
          <Image
            src={imageSrc}
            alt={`${counselor.firstName} ${counselor.lastName}`}
            width={91}
            height={118}
            className="rounded"
            unoptimized
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-700">{counselor.shortDescription}</p>
          <div>
            <p className="text-deep-sapphire font-medium">
              {counselor.firstName} {counselor.lastName}
            </p>
            <ul className="text-raspberry-smoothie text-sm">
              {counselor.titles.map((title) => (
                <li key={title}>{title}</li>
              ))}
            </ul>
          </div>
          <Link
            href={`/meet-us/${counselor.firstName}`}
            className="text-deep-sapphire hover:text-royal-indigo text-sm font-medium"
          >
            Read More&hellip;
          </Link>
        </div>
      </CardBody>
    </Card>
  )
}
