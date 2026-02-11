import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Heading, Card, CardTitle, CardBody } from '@/components/ui'

export const metadata: Metadata = {
    title: 'Resources - Compass Christian Counseling',
    description:
        'Crisis contacts, self-assessments, recommended reading, and mental health resources from Compass Christian Counseling.',
}

export default function ResourcesPage() {
    return (
        <div className="max-w-site mx-auto">
            <Heading level={2}>Resources</Heading>

            <div className="px-4 py-4">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {/* Left column */}
                    <div className="flex flex-col gap-4">
                        <Image
                            src="/assets/site-images/Help.png"
                            alt="Help!"
                            width={200}
                            height={200}
                            className="mx-auto"
                            unoptimized
                        />
                        <Card>
                            <CardTitle>Crisis Contacts</CardTitle>
                            <CardBody>
                                <dl className="space-y-2">
                                    <dt className="font-semibold">SUICIDE HOTLINE</dt>
                                    <dd>1-800-SUICIDE</dd>
                                    <dt className="font-semibold">Sexual Assault Hotline</dt>
                                    <dd>1-800-656-HOPE</dd>
                                </dl>
                                <p className="mt-4">
                                    For immediate help dial 911 or visit the nearest Hospital
                                    Emergency Room
                                </p>
                            </CardBody>
                        </Card>
                    </div>

                    {/* Center column */}
                    <div className="flex flex-col gap-4">
                        <Card>
                            <CardTitle>Quick Self-Assessments</CardTitle>
                            <CardBody>
                                <div className="flex flex-col gap-2">
                                    <a
                                        href="/assets/pdf/CompassAddiction.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Am I addicted?
                                    </a>
                                    <a
                                        href="/assets/pdf/CompassDepression.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Am I depressed?
                                    </a>
                                    <a
                                        href="/assets/pdf/CompassEatingDisorder.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Do I have an eating disorder?
                                    </a>
                                </div>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardTitle>Compass Articles</CardTitle>
                            <CardBody>
                                <p className="mb-3">
                                    You can access Compass Articles on a variety of mental health
                                    topics such as boundaries, grief, perfectionism, etc. We hope
                                    that the articles written by Compass Christian Counseling staff
                                    will be helpful to you.
                                </p>
                                <Link href="/newsletters">See articles here</Link>
                            </CardBody>
                        </Card>
                    </div>

                    {/* Right column */}
                    <div className="flex flex-col gap-4">
                        <Image
                            src="/assets/site-images/Book.png"
                            alt="Good reads"
                            width={200}
                            height={200}
                            className="mx-auto"
                            unoptimized
                        />
                        <Card>
                            <CardTitle>Good Reads</CardTitle>
                            <CardBody>
                                <p className="mb-3">Recommended Books on Life Issues</p>
                                <div className="flex flex-col gap-2">
                                    <a
                                        href="/assets/pdf/GoodReadsEatingDisorders.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Eating Disorders
                                    </a>
                                    <a
                                        href="/assets/pdf/GoodReadsParenting.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Parenting
                                    </a>
                                    <a
                                        href="/assets/pdf/GoodReadsMarriageAndRelationships.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Marriage &amp; Relationships
                                    </a>
                                    <a
                                        href="/assets/pdf/GoodReadsAddiction.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Addiction
                                    </a>
                                    <a
                                        href="/assets/pdf/GoodReadsSpiritualLife.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Spiritual
                                    </a>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
