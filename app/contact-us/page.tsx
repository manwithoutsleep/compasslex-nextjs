import Image from 'next/image'
import type { Metadata } from 'next'
import { counselorRepository } from '@/services/data-repository'
import ContactCounselorCard from '@/components/contact-counselor-card'
import { Heading } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Contact Us - Compass Christian Counseling',
  description:
    'Contact Compass Christian Counseling in Lexington, Kentucky. Find phone numbers, email addresses, and directions to our office.',
}

export default async function ContactUsPage() {
  const counselors = await counselorRepository.getAllCounselors()

  return (
    <div className="max-w-site mx-auto px-4 py-8">
      <Heading level={2}>Contact Us</Heading>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Left column: counselor contact cards */}
        <div>
          <p className="text-deep-sapphire mb-6 text-base">
            Call us with questions! Often we are in session and will not be able to answer the
            phone, but please leave a message and we will make every effort to return your call in a
            timely manner.
          </p>
          <div>
            {counselors.map((counselor) => (
              <ContactCounselorCard key={counselor.id} counselor={counselor} />
            ))}
          </div>
        </div>

        {/* Right column: directions and map */}
        <div>
          <div className="mb-6">
            <p className="text-deep-sapphire mb-4 text-base">
              We are located at the corner of New Circle Road and Alumni Drive. Take New Circle Road
              and exit at Alumni Drive (travel south away from Lexington city center). Take the
              first left onto Perimeter Drive, 651 Perimeter is the six-story glass office building
              on the left, Suite 115 is on the 1st floor.
            </p>
            <Image
              src="/assets/site-images/contactus-building_267x160.jpg"
              alt="building"
              width={267}
              height={160}
              className="mb-4 rounded"
              unoptimized
            />
            <div className="text-deep-sapphire">
              <strong>Compass Christian Counseling</strong>
              <br />
              651 Perimeter Drive, Suite 115
              <br />
              Lexington, KY 40517
            </div>
          </div>

          <div data-testid="map-placeholder" className="bg-bengal-blue h-64 w-full rounded">
            <p className="text-deep-sapphire flex h-full items-center justify-center text-sm">
              Map coming soon
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
