import { notFound } from 'next/navigation'
import Image from 'next/image'
import type { Metadata } from 'next'
import { counselorRepository } from '@/services/data-repository'

interface Props {
  params: Promise<{ firstname: string }>
}

export async function generateStaticParams() {
  const counselors = await counselorRepository.getAllCounselors()
  return counselors.map((counselor) => ({
    firstname: counselor.firstName,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { firstname } = await params
  const counselor = await counselorRepository.getCounselorByName(firstname)
  if (!counselor) return {}

  return {
    title: `${counselor.firstName} ${counselor.lastName} - Compass Christian Counseling`,
    description: counselor.shortDescription,
  }
}

export default async function CounselorDetailPage({ params }: Props) {
  const { firstname } = await params
  const counselor = await counselorRepository.getCounselorByName(firstname)

  if (!counselor) {
    notFound()
  }

  const imageSlug = counselor.firstName.toLowerCase()
  const imageSrc = `/assets/site-images/${imageSlug}-read-more-221x276.jpg`

  return (
    <div className="max-w-site mx-auto px-4 py-8">
      <h2 className="text-deep-sapphire mb-4 text-3xl font-bold">
        {counselor.firstName} {counselor.lastName}
      </h2>

      <div className="flex flex-col gap-6 md:flex-row">
        {/* Left: Image and sidebar info */}
        <div className="shrink-0 md:w-64">
          <div className="relative overflow-hidden rounded">
            <Image
              src={imageSrc}
              alt={`${counselor.firstName} ${counselor.lastName}`}
              width={221}
              height={276}
              className="w-full rounded"
              unoptimized
            />
            <div className="bg-deep-sapphire text-polar-mist mt-2 rounded p-3">
              <p className="font-semibold">
                {counselor.firstName} {counselor.lastName}
              </p>
              <ul className="text-sm">
                {counselor.titles.map((title) => (
                  <li key={title}>{title}</li>
                ))}
              </ul>
              <p className="mt-1 text-sm">Compass Christian Counseling</p>
              <a
                href={counselor.appointmentLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-warm-sand text-deep-sapphire hover:bg-peach-puff mt-2 block rounded px-3 py-2 text-center text-sm font-medium"
              >
                Make an appointment
                <br />
                with {counselor.firstName}
              </a>
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div className="flex-1">
          <div
            className="prose text-deep-sapphire max-w-none"
            dangerouslySetInnerHTML={{ __html: counselor.longDescription }}
          />

          {counselor.credentials.length > 0 && (
            <div className="mt-6">
              <p className="text-deep-sapphire font-bold">Educational/Professional</p>
              <ul className="text-deep-sapphire mt-2 list-inside list-disc">
                {counselor.credentials.map((credential) => (
                  <li key={credential}>{credential}</li>
                ))}
              </ul>
            </div>
          )}

          {counselor.memberships.length > 0 && (
            <div className="mt-6">
              <p className="text-deep-sapphire font-bold">Member of:</p>
              <ul className="text-deep-sapphire mt-2 list-inside list-disc">
                {counselor.memberships.map((membership) => (
                  <li key={membership}>{membership}</li>
                ))}
              </ul>
            </div>
          )}

          {counselor.insurance.length > 0 && (
            <div className="mt-6">
              <p className="text-deep-sapphire font-bold">In Network Provider for:</p>
              <ul className="text-deep-sapphire mt-2 list-inside list-disc">
                {counselor.insurance.map((provider) => (
                  <li key={provider}>{provider}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6">
            <p className="text-deep-sapphire">
              Contact me:{' '}
              <a
                href={`mailto:${counselor.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-royal-indigo hover:underline"
              >
                {counselor.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
