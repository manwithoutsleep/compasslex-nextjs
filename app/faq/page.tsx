import type { Metadata } from 'next'
import { Heading } from '@/components/ui'

export const metadata: Metadata = {
  title: 'FAQ - Compass Christian Counseling',
  description:
    'Frequently asked questions about counseling costs, insurance, session length, and more at Compass Christian Counseling.',
}

export default function FaqPage() {
  return (
    <div className="max-w-site mx-auto">
      <Heading level={2}>Frequently Asked Questions</Heading>

      <div className="px-4 py-4">
        <div className="space-y-8">
          <div>
            <h3 className="text-deep-sapphire mb-2 text-lg font-semibold">
              How much is counseling going to cost me?
            </h3>
            <p className="text-deep-sapphire">
              That is a complicated question. There are several factors to be considered. Our
              standard rate is $110 for an individual session and $140 for a couples/family session.
              The length of therapy is also a factor to consider. However, please don&apos;t let
              cost be the only factor when you are looking for therapy. Our advice is to find
              someone you truly believe can help you in your healing process.
            </p>
          </div>

          <div>
            <h3 className="text-deep-sapphire mb-2 text-lg font-semibold">
              Can I use my insurance?
            </h3>
            <p className="text-deep-sapphire">
              All of our counselors are providers for commercial Anthem Blue Cross/Blue Shield
              plans, commercial Aetna and United plans as well as the following Medicaid plans:
              Aetna Better Health, Passport Medicaid, Wellcare Medicaid, Humana Medicaid, and United
              Medicaid. If you have health insurance that is not listed above, we may be able to
              file an out-of-network claim that may result in partial reimbursement, or we can
              provide a &quot;superbill&quot; to you with insurance-friendly codes that you can file
              yourself.
            </p>
          </div>

          <div>
            <h3 className="text-deep-sapphire mb-2 text-lg font-semibold">
              If I don&apos;t use my insurance, what are the benefits of private pay?
            </h3>
            <ul className="text-deep-sapphire list-inside list-disc">
              <li>You and your therapist are in charge of goals and length of treatment.</li>
              <li>
                Insurance requires diagnosis to authorize treatment. These labels can follow a
                client through life and may become part of a permanent health record.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-deep-sapphire mb-2 text-lg font-semibold">
              What type of payment methods do you accept?
            </h3>
            <p className="text-deep-sapphire">
              We accept cash, check, debit/credit and flexible health spending cards. Payment is due
              at time of service.
            </p>
          </div>

          <div>
            <h3 className="text-deep-sapphire mb-2 text-lg font-semibold">
              How long does therapy take?
            </h3>
            <p className="text-deep-sapphire">
              Each session lasts 50 minutes. The number of sessions really depends on the severity
              of the issue(s) and how willing you are to make a change in habits and behaviors. Your
              therapy could range from 2 to 3 sessions to years of therapy. Often we can reach our
              initial goals with somewhere between 4 and 8 sessions. Couples counseling generally
              takes 8 to 12 sessions.
            </p>
          </div>

          <div>
            <h3 className="text-deep-sapphire mb-2 text-lg font-semibold">
              Do I have to be a Christian to see someone at Compass?
            </h3>
            <p className="text-deep-sapphire">
              No. Our services are available to everyone regardless of their religious beliefs or
              faith. We do not impose on your current belief system nor actively try to convert you
              to Christianity. We naturally incorporate spiritual components into therapy as we feel
              that healing is not complete unless we address the entire person - emotionally,
              physically, and spiritually. If you ever feel uneasy with any aspect of your care,
              please make us aware of your concerns.
            </p>
          </div>

          <div>
            <h3 className="text-deep-sapphire mb-2 text-lg font-semibold">
              What if I have to cancel my session?
            </h3>
            <p className="text-deep-sapphire">
              We understand that sometimes life throws us unexpected curves in the form of illness
              or emergencies. If you need to cancel an appointment, please give us 48 hours notice,
              otherwise you will be charged a $95 fee for your counseling session. This notice
              allows us to schedule someone in your place.
            </p>
          </div>

          <div>
            <h3 className="text-deep-sapphire mb-2 text-lg font-semibold">
              What kind of therapy do you practice?
            </h3>
            <p className="text-deep-sapphire">
              Our primary mode of therapy is a custom designed integrated approach for each client
              utilizing tools/techniques from the cognitive-behavioral, experiential,
              intergenerational, structural, existential, transactional, narrative, solution focused
              and psychoanalytic schools of thought.
            </p>
          </div>

          <div>
            <h3 className="text-deep-sapphire mb-2 text-lg font-semibold">
              What if I&apos;m not sure counseling will really help?
            </h3>
            <p className="text-deep-sapphire">
              There are many factors that will influence whether we seek the help of a counselor. We
              may be reluctant to start the process because we don&apos;t know what to expect. Often
              we feel that the problem that we are facing isn&apos;t big enough. We may wonder if
              seeking help is a statement about our ability to solve problems on our own or a
              judgment on our character. We may feel guilty going outside of our family to get help.
              Some of us have been taught to &quot;tough it out&quot;; to be fiercely independent,
              and get on with life&hellip; By admitting that we need some extra help on our journey
              we set ourselves on a path of growth that changes our lives for the better. If you
              find yourself &quot;stuck&quot;, then you owe it to yourself to try this process.
            </p>
          </div>

          <div>
            <h3 className="text-deep-sapphire mb-2 text-lg font-semibold">
              What can I expect in the counseling process?
            </h3>
            <p className="text-deep-sapphire">
              The counseling relationship differs from the type of relationship people have with
              friends and family. Counseling entails you and counselor working together for the
              benefit of you. You and your counselor will set goals together, they will not be
              imposed on you. The counselor role includes providing support for you without
              judgment. You set the pace of the session as you become comfortable in discussing your
              feelings and thoughts. The counselor can often be helpful in assisting you with
              difficult emotions through support, acceptance, and helping you gain insight about
              yourself.
            </p>
          </div>

          <div>
            <h3 className="text-deep-sapphire mb-2 text-lg font-semibold">
              How do I know that counseling is working?
            </h3>
            <p className="text-deep-sapphire">
              Successful counseling feels like something has changed, something is different. You
              feel more hope and self-confidence. You are trying out new behaviors and they are
              working. The way successful therapy looks is other people begin to comment that
              something about you seems different. Maybe they don&apos;t know what has changed in
              you, but you feel better to be around. You will also notice that you are having
              different results from actions that in the past would not have gone so well.
            </p>
          </div>

          <div>
            <h3 className="text-deep-sapphire mb-2 text-lg font-semibold">
              How will I know when I am done with counseling?
            </h3>
            <p className="text-deep-sapphire">
              You will feel done. Most of the concerns and anxiety that brought you into therapy
              will have dissipated. You will have learned coping skills and new behaviors to deal
              with any issues that may persist. Your therapist should be able to give you feedback
              about your decision and discuss whether or not they feel you are ready to terminate.
              Ultimately the decision is in your hands.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
