import { notFound } from 'next/navigation'
import Image from 'next/image'
import type { Metadata } from 'next'
import { counselorRepository } from '@/services/data-repository'
import { Heading } from '@/components/ui'

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
    <div className="max-w-site mx-auto">
      <Heading level={2}>
        {counselor.firstName} {counselor.lastName}
      </Heading>

      <div className="px-4 py-4">
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Left: Image and sidebar info */}
          <div className="shrink-0 md:w-56">
            <div className="relative overflow-hidden rounded">
              <Image
                src={imageSrc}
                alt={`${counselor.firstName} ${counselor.lastName}`}
                width={221}
                height={276}
                className="mx-auto w-full max-w-[221px] rounded-2xl object-cover"
                unoptimized
              />
              <div className="mx-auto mt-2 w-full max-w-[221px] py-1">
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
                  className="bg-ultra-pure-white text-deep-sapphire hover:bg-bengal-blue mt-2 block rounded border px-2 py-1 text-center text-sm font-medium font-semibold"
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
                <ul className="text-deep-sapphire mt-2 ml-6 list-inside">
                  {counselor.credentials.map((credential) => (
                    <li key={credential}>{credential}</li>
                  ))}
                </ul>
              </div>
            )}

            {counselor.memberships.length > 0 && (
              <div className="mt-6">
                <p className="text-deep-sapphire font-bold">Member of:</p>
                <ul className="text-deep-sapphire mt-2 ml-6 list-inside">
                  {counselor.memberships.map((membership) => (
                    <li key={membership}>{membership}</li>
                  ))}
                </ul>
              </div>
            )}

            {counselor.insurance.length > 0 && (
              <div className="mt-6">
                <p className="text-deep-sapphire font-bold">In Network Provider for:</p>
                <ul className="text-deep-sapphire mt-2 ml-6 list-inside">
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
    </div>
  )
}
