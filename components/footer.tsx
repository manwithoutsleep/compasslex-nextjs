import Image from 'next/image'

/**
 * Footer component with address, building image, and map
 *
 * Features:
 * - Address and contact information
 * - Building image
 * - Map placeholder (actual Google Maps in Task 06)
 * - Background horizon image (desktop only)
 * - Responsive layout
 */
export default function Footer() {
  return (
    <footer className="m-auto flex w-full flex-row flex-wrap items-center justify-evenly p-[0_0_16px_0] min-[600px]:bg-[url('/assets/site-images/footer-horizon.jpg')] min-[600px]:bg-[length:contain] min-[600px]:bg-bottom min-[600px]:bg-no-repeat">
      {/* Address Section */}
      <div className="mb-1 flex flex-col">
        <div className="text-[1.1em] leading-[30px]">
          Compass Christian Counseling
          <br />
          651 Perimeter Drive, Suite 115
          <br />
          Lexington, KY 40517
          <br />
          (859) 721-3259
          <br />
        </div>
        <Image
          src="/assets/site-images/contactus-building_267x160.jpg"
          alt="building"
          width={267}
          height={160}
        />
      </div>

      {/* Map Section - Placeholder */}
      <div className="flex w-full flex-col items-center min-[600px]:w-full min-[600px]:max-w-[465px]">
        <div className="flex h-[300px] w-full items-center justify-center bg-gray-200 text-gray-600">
          Map will be integrated in Task 06
        </div>
      </div>
    </footer>
  )
}
