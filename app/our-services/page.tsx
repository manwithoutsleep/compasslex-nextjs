import Image from 'next/image'
import type { Metadata } from 'next'
import { Heading, Card, CardTitle, CardBody } from '@/components/ui'

export const metadata: Metadata = {
    title: 'Our Services - Compass Christian Counseling',
    description:
        'Compass Christian Counseling offers individual, family, couples, and group therapy for adults, teens and children.',
}

const SERVICE_AREAS = [
    'Addictions',
    'Depression',
    'Stress and Anxiety',
    'Phobias',
    'Grief and Loss',
    'Emotional and Physical Abuse',
    'Trauma and Sexual Assault',
    'ADHD',
    'Eating Disorders',
    'Obsessive Compulsive Disorder',
    'PTSD',
    'Premarital Counseling',
    'Communication Issues',
    'Blending Families',
    'Living with Medical Conditions',
    'Codependency and Boundaries',
    'Anger Management',
    'Parenting Stress',
    'Self Esteem and Self-Confidence Issues',
    'School and Homework Difficulties',
    'Behavioral Problems in Children',
]

export default function OurServicesPage() {
    return (
        <div className="max-w-site mx-auto">
            <Heading level={2}>Our Services</Heading>

            <div className="px-4 py-4">
                <div className="flex flex-row flex-wrap justify-evenly">
                    {/* Left column: service areas */}
                    <div className="flex max-w-[275px] flex-col items-center gap-4 md:mx-0">
                        <Card>
                            <CardBody>
                                <p>
                                    Compass Christian Counseling offers individual, family, couples,
                                    and group therapy for adults, teens and children dealing with
                                    the following issues:
                                </p>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                                {SERVICE_AREAS.map((area) => (
                                    <p key={area}>{area}</p>
                                ))}
                            </CardBody>
                        </Card>
                    </div>

                    {/* Center column: images */}
                    <div className="flex max-w-[271px] flex-col items-center rounded px-4">
                        <Image
                            src="/assets/site-images/OurServicesTop.jpg"
                            alt="Counseling services"
                            width={300}
                            height={200}
                            className="border-deep-sapphire my-0 w-full border-6"
                            unoptimized
                        />
                        <Image
                            src="/assets/site-images/OurServicesMiddle.png"
                            alt="Counseling services"
                            width={300}
                            height={200}
                            className="border-deep-sapphire my-0 w-full border-6"
                            unoptimized
                        />
                        <Image
                            src="/assets/site-images/OurServicesBottom.jpg"
                            alt="Counseling services"
                            width={300}
                            height={200}
                            className="border-deep-sapphire my-0 w-full border-6"
                            unoptimized
                        />
                    </div>

                    {/* Right column: service type cards */}
                    <div className="flex max-w-[350px] flex-col items-center gap-4">
                        <Card>
                            <CardTitle>INDIVIDUAL COUNSELING</CardTitle>
                            <CardBody>
                                <p>
                                    Each individual is unique, with their own experiences,
                                    interpretations, and beliefs. A variety of circumstances can
                                    keep us from experiencing freedom and enjoyment of life. We want
                                    to carefully collaborate with you to build hope and purpose in
                                    your heart, your life and your relationships, restoring freedom
                                    and enjoyment.
                                </p>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardTitle>COUPLES COUNSELING</CardTitle>
                            <CardBody>
                                <p>
                                    Arguments, disagreements, loneliness, and hurt&hellip; there is
                                    nothing more joyful when our primary relationships are working
                                    well, and nothing more painful when they are not! In couples
                                    therapy our focus will be to understand what is going on,
                                    particularly as it relates to the patterns that exist in the
                                    relationship and then, we&apos;ll work to de-escalate negative
                                    cycles and introduce new patterns of relating to one another.
                                </p>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardTitle>FAMILY COUNSELING</CardTitle>
                            <CardBody>
                                <p>
                                    In Family Therapy, the family is seen as a &quot;whole&quot;
                                    system, rather than just as the sum of its individual members.
                                    Including various members of the family can be beneficial to a
                                    wide variety of therapeutic goals including education or insight
                                    into family dynamics. Family therapy helps promote greater
                                    encouragement and support among all members of the family.
                                </p>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardTitle>GROUP COUNSELING</CardTitle>
                            <CardBody>
                                <p>
                                    Group therapy happens when people from all different walks of
                                    life come together with a common focus. Group therapy offers
                                    several benefits&hellip; by listening carefully to others and
                                    their experiences you can experience new insights and find out
                                    that you are not alone in your struggles.
                                </p>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
