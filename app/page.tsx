import Link from 'next/link'
import type { Metadata } from 'next'
import HomePageRotator from '@/components/home-page-rotator'

export const metadata: Metadata = {
    title: 'Compass Christian Counseling - Lexington, Kentucky',
    description:
        'Compass Christian Counseling provides a safe and supportive place for individuals, couples, and families to find hope and healing in Lexington, Kentucky.',
}

export default function HomePage() {
    return (
        <div>
            {/* Image rotator */}
            <HomePageRotator />

            {/* Page content */}
            <div className="max-w-site mx-auto mt-[18px] mb-[18px]">
                {/* Row 1: Intro */}
                <div>
                    <div className="mx-auto max-w-[750px] p-2 pb-6">
                        <p className="text-[1.2em] leading-[1.3em]">
                            At Compass Christian Counseling our goal is to provide a safe and
                            supportive place for individuals, couples, and families to find hope and
                            healing. You might be looking for extra support and guidance through a
                            challenging situation or are ready to take steps in a new direction. The
                            first thing we&apos;ll do is listen without judgment. Then, we&apos;ll
                            walk alongside of you on your journey. Together we will create solutions
                            and new possibilities that will help you reach your goals. We all have a
                            unique path we take through life&hellip; and sometimes we just need a
                            little help along the way.
                        </p>
                    </div>
                </div>

                {/* Row 2: Meet Us (image left, text right) */}
                <div className="bg-bengal-blue grid min-h-[250px] grid-cols-1 md:grid-cols-2">
                    <div
                        className="min-h-[250px]"
                        style={{
                            backgroundImage: 'url(/assets/site-images/home-image-1.webp)',
                            backgroundPosition: 'top center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                        }}
                    />
                    <div className="m-2">
                        <h2 className="p-2 text-[1.5em] leading-[1.5em] font-bold">
                            <Link href="/meet-us" className="no-underline">
                                Meet Us
                            </Link>
                        </h2>
                        <p className="p-2">
                            Meet our compassionate team of counselors at Compass Christian
                            Counseling, each dedicated to guiding you through life&apos;s
                            challenges. Whether facing personal struggles, relationship issues, or
                            family dynamics, our therapists provide a nurturing environment designed
                            to foster healing and growth. Let us walk with you towards finding
                            peace, understanding, and renewed hope.
                        </p>
                    </div>
                </div>

                {/* Row 3: Our Services (text left, image right) */}
                <div className="bg-raspberry-smoothie grid min-h-[250px] grid-cols-1 md:grid-cols-2">
                    <div className="m-2">
                        <h2 className="p-2 text-[1.5em] leading-[1.5em] font-bold">
                            <Link href="/our-services" className="no-underline">
                                Our Services
                            </Link>
                        </h2>
                        <p className="p-2">
                            At Compass Christian Counseling, we offer a comprehensive range of
                            services including individual, couples, family, and group therapy. Our
                            experienced counselors are equipped to address a variety of issues such
                            as depression, anxiety, trauma, and more. Whether you&apos;re seeking
                            support for personal challenges or looking to strengthen relationships,
                            we&apos;re here to provide the guidance and tools you need to thrive.
                        </p>
                    </div>
                    <div
                        className="min-h-[250px]"
                        style={{
                            backgroundImage: 'url(/assets/site-images/home-image-2.webp)',
                            backgroundPosition: 'top center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                        }}
                    />
                </div>

                {/* Row 4: FAQ (image left, text right) */}
                <div className="bg-ultra-pure-white grid min-h-[250px] grid-cols-1 md:grid-cols-2">
                    <div
                        className="min-h-[250px]"
                        style={{
                            backgroundImage: 'url(/assets/site-images/home-image-4.webp)',
                            backgroundPosition: 'top center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                        }}
                    />
                    <div className="m-2">
                        <h2 className="p-2 text-[1.5em] leading-[1.5em] font-bold">
                            <Link href="/faq" className="no-underline">
                                FAQ
                            </Link>
                        </h2>
                        <p className="p-2">
                            Explore our Frequently Asked Questions page where we provide clear and
                            helpful answers to common queries about counseling costs, insurance
                            coverage, the benefits of private pay, session lengths, our therapeutic
                            approach, and much more. This resource is designed to ease your
                            concerns, clarify the counseling process, and help you understand how
                            Compass Christian Counseling can support you on your journey to
                            wellness.
                        </p>
                    </div>
                </div>

                {/* Row 5: Resources (text left, image right) */}
                <div className="bg-raspberry-smoothie grid min-h-[250px] grid-cols-1 md:grid-cols-2">
                    <div className="m-2">
                        <h2 className="p-2 text-[1.5em] leading-[1.5em] font-bold">
                            <Link href="/resources" className="no-underline">
                                Resources
                            </Link>
                        </h2>
                        <p className="p-2">
                            Visit our Resources page for essential support tools and information,
                            including suicide and sexual assault hotline numbers, quick
                            self-assessment forms for addiction, depression, and eating disorders,
                            and a curated list of recommended books addressing various life issues.
                            This page is designed to provide immediate help and ongoing support for
                            anyone needing assistance or seeking to deepen their understanding of
                            personal challenges.
                        </p>
                    </div>
                    <div
                        className="min-h-[250px]"
                        style={{
                            backgroundImage: 'url(/assets/site-images/home-image-5.webp)',
                            backgroundPosition: 'top center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                        }}
                    />
                </div>

                {/* Row 6: Contact Us (image left, text right) */}
                <div className="bg-bengal-blue grid min-h-[250px] grid-cols-1 md:grid-cols-2">
                    <div
                        className="min-h-[250px]"
                        style={{
                            backgroundImage: 'url(/assets/site-images/home-image-6.webp)',
                            backgroundPosition: 'top center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                        }}
                    />
                    <div className="m-2">
                        <h2 className="p-2 text-[1.5em] leading-[1.5em] font-bold">
                            <Link href="/contact-us" className="no-underline">
                                Contact Us
                            </Link>
                        </h2>
                        <p className="p-2">
                            The Contact Us page of Compass Christian Counseling offers various ways
                            to reach us, including phone numbers, email addresses, and direct links
                            to our appointment scheduling tools. Additionally, you&apos;ll find a
                            detailed map to our office, ensuring you can locate us easily for your
                            appointments. This page is your gateway to connecting with our
                            supportive team and starting your journey toward healing.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
