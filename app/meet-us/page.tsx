import type { Metadata } from 'next'
import { counselorRepository } from '@/services/data-repository'
import CounselorCard from '@/components/counselor-card'
import { Heading } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Meet Us - Compass Christian Counseling',
  description:
    "Meet our professional Christian counselors in Lexington, Kentucky. Each dedicated to guiding you through life's challenges.",
}

export default async function MeetUsPage() {
  const counselors = await counselorRepository.getAllCounselors()

  return (
    <div className="max-w-site mx-auto">
      <Heading level={2}>Meet Us</Heading>
      <div className="px-4 py-4">
        {counselors.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {counselors.map((counselor) => (
              <CounselorCard key={counselor.id} counselor={counselor} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
