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
    const imageSrc = `/assets/counselor-images/${imageSlug}-meet-us-182x235.jpg`

    return (
        <Card className="bg-bengal-blue">
            <CardTitle>Hi, I&apos;m {firstName}</CardTitle>
            <CardBody className="text-deep-sapphire flex gap-4 p-1.5 text-base">
                <div className="shrink-0">
                    <Link href={`/meet-us/${counselor.firstName}`} className="no-underline">
                        <Image
                            src={imageSrc}
                            alt={`${counselor.firstName} ${counselor.lastName}`}
                            width={182}
                            height={235}
                            className="cursor-pointer rounded"
                            unoptimized
                        />
                    </Link>
                </div>
                <div className="flex flex-col gap-2">
                    <p>{counselor.shortDescription}</p>
                    <div>
                        <p className="font-medium">
                            {counselor.firstName} {counselor.lastName}
                        </p>
                        <ul className="m-0 list-none p-0">
                            {counselor.titles.map((title) => (
                                <li key={title}>{title}</li>
                            ))}
                        </ul>
                    </div>
                    <Link href={`/meet-us/${counselor.firstName}`}>Read More&hellip;</Link>
                </div>
            </CardBody>
        </Card>
    )
}
