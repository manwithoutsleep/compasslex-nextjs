import { Card, CardTitle, CardBody, Button, Heading } from '@/components/ui'

export default function Home() {
  return (
    <div className="bg-ultra-pure-white min-h-screen p-8">
      <div className="max-w-site mx-auto">
        <Heading level={1}>Design System Demo</Heading>
        <p className="text-deep-sapphire mb-8 text-lg">
          Visual verification of Tailwind v4 theme and UI components
        </p>

        {/* Color Palette Section */}
        <section className="mb-12">
          <Heading level={2}>Color Palette</Heading>

          <div className="mb-6">
            <h3 className="text-deep-sapphire mb-3 text-xl font-semibold">Primary Colors</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="border-deep-sapphire rounded border-2 p-4">
                <div className="bg-deep-sapphire mb-2 h-20 rounded"></div>
                <p className="font-medium">Deep Sapphire</p>
                <p className="text-sm text-gray-600">#191248</p>
              </div>
              <div className="border-deep-sapphire rounded border-2 p-4">
                <div className="bg-warm-sand mb-2 h-20 rounded"></div>
                <p className="font-medium">Warm Sand</p>
                <p className="text-sm text-gray-600">#f2c58a</p>
              </div>
              <div className="border-deep-sapphire rounded border-2 p-4">
                <div className="bg-pure-white mb-2 h-20 rounded border"></div>
                <p className="font-medium">Pure White</p>
                <p className="text-sm text-gray-600">#ffffff</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-deep-sapphire mb-3 text-xl font-semibold">Secondary Colors</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="border-deep-sapphire rounded border-2 p-4">
                <div className="bg-polar-mist mb-2 h-20 rounded"></div>
                <p className="font-medium">Polar Mist</p>
                <p className="text-sm text-gray-600">#ddeff7</p>
              </div>
              <div className="border-deep-sapphire rounded border-2 p-4">
                <div className="bg-royal-indigo mb-2 h-20 rounded"></div>
                <p className="font-medium">Royal Indigo</p>
                <p className="text-sm text-gray-600">#43208a</p>
              </div>
              <div className="border-deep-sapphire rounded border-2 p-4">
                <div className="bg-peach-puff mb-2 h-20 rounded"></div>
                <p className="font-medium">Peach Puff</p>
                <p className="text-sm text-gray-600">#fbe3c9</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-deep-sapphire mb-3 text-xl font-semibold">Tertiary Colors</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div className="border-deep-sapphire rounded border-2 p-4">
                <div className="bg-bengal-blue mb-2 h-20 rounded"></div>
                <p className="font-medium">Bengal Blue</p>
                <p className="text-sm text-gray-600">#b1cfdd</p>
              </div>
              <div className="border-deep-sapphire rounded border-2 p-4">
                <div className="bg-raspberry-smoothie mb-2 h-20 rounded"></div>
                <p className="font-medium">Raspberry Smoothie</p>
                <p className="text-sm text-gray-600">#c6a3b3</p>
              </div>
              <div className="border-deep-sapphire rounded border-2 p-4">
                <div className="bg-north-pole-blue mb-2 h-20 rounded"></div>
                <p className="font-medium">North Pole Blue</p>
                <p className="text-sm text-gray-600">#709eb4</p>
              </div>
              <div className="border-deep-sapphire rounded border-2 p-4">
                <div className="bg-ultra-pure-white mb-2 h-20 rounded border"></div>
                <p className="font-medium">Ultra Pure White</p>
                <p className="text-sm text-gray-600">#f8f9f3</p>
              </div>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section className="mb-12">
          <Heading level={2}>Typography (Roboto)</Heading>
          <div className="space-y-4">
            <div>
              <Heading level={1}>Heading Level 1</Heading>
            </div>
            <div>
              <Heading level={2}>Heading Level 2</Heading>
            </div>
            <div>
              <Heading level={3}>Heading Level 3</Heading>
            </div>
            <div>
              <Heading level={4}>Heading Level 4</Heading>
            </div>
            <div>
              <Heading level={5}>Heading Level 5</Heading>
            </div>
            <div>
              <Heading level={6}>Heading Level 6</Heading>
            </div>
            <p className="text-base">
              Body text in Roboto font: The quick brown fox jumps over the lazy dog. 0123456789
            </p>
          </div>
        </section>

        {/* Button Component Section */}
        <section className="mb-12">
          <Heading level={2}>Button Component</Heading>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="primary" disabled>
              Disabled Button
            </Button>
          </div>
        </section>

        {/* Card Component Section */}
        <section className="mb-12">
          <Heading level={2}>Card Component</Heading>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardTitle>Card Title Example</CardTitle>
              <CardBody>
                <p>
                  This is a card component matching the Angular .ui-card styling. It has a
                  deep-sapphire border and title background with polar-mist text.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardTitle>Another Card</CardTitle>
              <CardBody>
                <p className="mb-4">
                  Cards can contain any content including paragraphs, lists, and buttons.
                </p>
                <Button variant="primary">Call to Action</Button>
              </CardBody>
            </Card>

            <Card className="md:col-span-2">
              <CardTitle>Full Width Card</CardTitle>
              <CardBody>
                <p className="mb-4">
                  This card spans the full width and demonstrates composability.
                </p>
                <div className="space-y-2">
                  <Heading level={4}>Features:</Heading>
                  <ul className="list-inside list-disc space-y-1">
                    <li>Extensible via className prop</li>
                    <li>Follows SOLID principles</li>
                    <li>Matches Angular design exactly</li>
                    <li>Fully typed with TypeScript</li>
                  </ul>
                </div>
              </CardBody>
            </Card>
          </div>
        </section>

        {/* Integration Example */}
        <section className="mb-12">
          <Heading level={2}>Component Integration</Heading>
          <Card>
            <CardTitle>Contact Information</CardTitle>
            <CardBody>
              <Heading level={3}>Get in Touch</Heading>
              <p className="mb-4">
                We&apos;d love to hear from you. Send us a message using the button below.
              </p>
              <div className="flex gap-3">
                <Button variant="primary">Send Message</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </CardBody>
          </Card>
        </section>
      </div>
    </div>
  )
}
