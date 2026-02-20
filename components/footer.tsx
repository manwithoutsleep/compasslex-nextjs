import Image from 'next/image'
import GoogleMap from '@/components/google-map'

/**
 * Footer component with address, building image, and map
 *
 * Features:
 * - Address and contact information
 * - Building image
 * - Google Maps integration showing office location
 * - Background horizon image (desktop only)
 * - Responsive layout
 */
export default function Footer() {
    return (
        <footer className="m-auto flex w-full flex-row flex-wrap items-center justify-evenly p-[0_0_16px_0]">
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

            {/* Map Section */}
            <div className="flex w-full flex-col items-center min-[600px]:max-w-[465px]">
                <GoogleMap
                    testId="google-map-footer"
                    ariaLabel="Map in footer showing office location"
                />
            </div>
        </footer>
    )
}
