import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Check, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/site-config'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/pricing',
    title: 'Distribution pricing',
    description: `Plans and add-ons for publishing through ${SITE_CONFIG.name}.`,
  })
}

const tiers = [
  {
    name: 'Basic',
    price: '$199',
    cadence: 'per release',
    blurb: 'Essential syndication for teams getting started with structured announcements.',
    cta: 'Choose Basic',
    featured: false,
    features: ['National distribution tier', 'Indexed archive page', 'Standard analytics snapshot', 'Email support'],
  },
  {
    name: 'Pro',
    price: '$399',
    cadence: 'per release',
    blurb: 'Higher reach, richer analytics, and faster review for active communications teams.',
    cta: 'Choose Pro',
    featured: true,
    features: ['Expanded media targeting', 'Engagement analytics dashboard', 'Priority editorial review', 'Embeddable quote cards'],
  },
  {
    name: 'Premium',
    price: '$749',
    cadence: 'per release',
    blurb: 'Maximum visibility with concierge routing for launches, M&A, and crisis moments.',
    cta: 'Talk with us',
    featured: false,
    features: ['Premium outlet bundle', 'Dedicated strategist window', 'Multimedia packaging', 'Same-day escalation path'],
  },
]

const comparison = [
  { label: 'Distribution level', basic: 'National', pro: 'National + verticals', premium: 'National + premium bundle' },
  { label: 'Analytics', basic: 'Snapshot', pro: 'Full dashboard', premium: 'Dashboard + exports' },
  { label: 'Media reach', basic: 'Core network', pro: 'Extended network', premium: 'Maximum reach + pitching' },
]

const addOns = [
  {
    title: 'Multimedia boost',
    body: 'Extra hero imagery, inline galleries, and logo lockups for product launches.',
  },
  {
    title: 'Executive quote block',
    body: 'Pull-quote styling with brand colors for leadership statements.',
  },
  {
    title: 'Localization pack',
    body: 'Alternate headline and summary variants for regional readers.',
  },
]

const faqs = [
  {
    q: 'How quickly can a release go live?',
    a: 'Most drafts move through editorial review within one business day. Premium includes a faster escalation lane for time-sensitive news.',
  },
  {
    q: 'Can we switch plans between releases?',
    a: 'Yes. Choose the tier that matches each announcement—there is no long-term lock-in on per-release pricing.',
  },
  {
    q: 'Do you support multimedia and attachments?',
    a: 'Yes. Add images, video links, and structured quote modules. Larger bundles are available as add-ons.',
  },
  {
    q: 'What analytics are included?',
    a: 'Basic includes a concise snapshot. Pro and Premium add engagement metrics, referrer visibility, and exportable summaries.',
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#e2dfd0] text-[#2a211c]">
      <NavbarShell />
      <main>
        <section className="relative overflow-hidden border-b border-[#32012f]/15 bg-[#32012f] text-[#fdf8f2]">
          <div className="absolute inset-0 opacity-30">
            <Image src="/brand/pricing-hero.jpg" alt="" fill className="object-cover" priority />
          </div>
          <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f97300]">Pricing</p>
            <h1 className="font-display mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl">
              Plans tuned for serious announcements
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#e0d8cc]">
              Pick a per-release tier that matches the moment—launch notes, earnings, M&A, or ongoing coverage. Add-ons layer on
              when you need multimedia, localization, or extra reach.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#f97300] px-6 py-3 text-sm font-semibold text-[#1a0f0c] shadow-[0_8px_28px_rgba(249,115,0,0.35)]"
              >
                Talk to the desk
              </Link>
              <Link
                href="/updates"
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Read recent releases
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-2xl border bg-[#fbf9f4] p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                  tier.featured ? 'border-[#f97300] ring-2 ring-[#f97300]/30' : 'border-[#32012f]/10'
                }`}
              >
                {tier.featured ? (
                  <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-[#f97300] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1a0f0c]">
                    <Sparkles className="h-3.5 w-3.5" />
                    Popular
                  </span>
                ) : null}
                <h2 className="font-display text-xl font-semibold text-[#32012f]">{tier.name}</h2>
                <p className="mt-3 text-sm text-[#524c42]">{tier.blurb}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold tracking-tight text-[#32012f]">{tier.price}</span>
                  <span className="text-sm text-[#6b6258]">{tier.cadence}</span>
                </div>
                <ul className="mt-6 flex-1 space-y-2.5 text-sm text-[#524c42]">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#f97300]" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`mt-8 inline-flex justify-center rounded-full px-5 py-3 text-center text-sm font-semibold ${
                    tier.featured ? 'bg-[#f97300] text-[#1a0f0c]' : 'border border-[#32012f]/20 text-[#32012f] hover:bg-[#32012f]/5'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-[#32012f]/10 bg-[#ebe7dc] py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-display text-center text-2xl font-semibold text-[#32012f]">Feature comparison</h2>
            <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-[#524c42]">A quick read across the dimensions teams ask about most.</p>
            <div className="mt-10 overflow-x-auto rounded-2xl border border-[#32012f]/10 bg-[#fbf9f4] shadow-sm">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-[#32012f]/10 bg-white/70">
                    <th className="px-4 py-3 font-semibold text-[#32012f]">Capability</th>
                    <th className="px-4 py-3 font-semibold text-[#524c42]">Basic</th>
                    <th className="px-4 py-3 font-semibold text-[#f97300]">Pro</th>
                    <th className="px-4 py-3 font-semibold text-[#524c42]">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr key={row.label} className="border-b border-[#32012f]/8 last:border-0">
                      <td className="px-4 py-4 font-medium text-[#32012f]">{row.label}</td>
                      <td className="px-4 py-4 text-[#524c42]">{row.basic}</td>
                      <td className="px-4 py-4 text-[#2a211c]">{row.pro}</td>
                      <td className="px-4 py-4 text-[#524c42]">{row.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-center text-2xl font-semibold text-[#32012f]">Add-ons</h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-[#524c42]">Layer extras when the story needs more than text.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {addOns.map((item) => (
              <div key={item.title} className="rounded-2xl border border-[#32012f]/10 bg-[#fbf9f4] p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#32012f]">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#524c42]">{item.body}</p>
                <Link href="/contact" className="mt-5 inline-flex text-sm font-semibold text-[#c2410c] hover:underline">
                  Request add-on →
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-[#32012f]/10 bg-[#f6f3ea] py-14">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="font-display text-center text-2xl font-semibold text-[#32012f]">FAQ</h2>
            <Accordion type="single" collapsible className="mt-8 space-y-2">
              {faqs.map((item, i) => (
                <AccordionItem key={item.q} value={`item-${i}`} className="rounded-xl border border-[#32012f]/10 bg-[#fbf9f4] px-4">
                  <AccordionTrigger className="text-left text-[#32012f] hover:no-underline">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-[#524c42]">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="bg-[#32012f] py-12 text-center text-[#fdf8f2]">
          <p className="font-display text-xl font-semibold">Need a custom bundle?</p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-[#d8cfc3]">Enterprise comms teams can mix retainers, volume pricing, and co-branded desks.</p>
          <Link href="/contact" className="mt-6 inline-flex rounded-full bg-[#f97300] px-6 py-3 text-sm font-semibold text-[#1a0f0c]">
            Contact sales
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  )
}

