import Image from 'next/image'
import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/about',
    title: `About ${SITE_CONFIG.name}`,
    description: `How ${SITE_CONFIG.name} helps organizations publish readable press releases and announcements.`,
  })
}

const pillars = [
  {
    title: 'Editorial clarity',
    body: 'We keep layouts calm and typographically strong so readers notice the story—not the chrome.',
  },
  {
    title: 'Operational speed',
    body: 'Publishing workflows stay lightweight: draft, review, and ship without fighting the interface.',
  },
  {
    title: 'Measurable reach',
    body: 'Structured pages, share tools, and archive-friendly grids make distribution easier to track.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#e2dfd0] text-[#2a211c]">
      <NavbarShell />
      <main>
        <section className="border-b border-[#32012f]/10 bg-[#f6f3ea]">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:py-20">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f97300]">About</p>
              <h1 className="font-display mt-3 text-4xl font-semibold tracking-[-0.03em] text-[#32012f] sm:text-5xl">
                A newsroom surface for modern announcements
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#524c42]">
                {SITE_CONFIG.name} exists to help communications teams publish announcements that feel credible on the page and
                easy to share off of it. The product blends editorial pacing with SaaS-grade reliability—no noisy marketplace
                chrome, no endless feed tricks.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/updates"
                  className="inline-flex rounded-full bg-[#f97300] px-6 py-3 text-sm font-semibold text-[#1a0f0c]"
                >
                  Browse releases
                </Link>
                <Link href="/contact" className="inline-flex rounded-full border border-[#32012f]/25 px-6 py-3 text-sm font-semibold text-[#32012f]">
                  Contact the desk
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#32012f]/10 shadow-[0_24px_60px_rgba(32,8,28,0.12)]">
              <Image src="/brand/about-visual.jpg" alt="Editorial collaboration" fill className="object-cover" sizes="480px" />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-2xl font-semibold text-[#32012f]">What we optimize for</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title} className="rounded-2xl border border-[#32012f]/10 bg-[#fbf9f4] p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#32012f]">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#524c42]">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-[#32012f]/10 bg-[#32012f] py-14 text-[#f4ede3]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="font-display text-2xl font-semibold">Ready to ship your next release?</h2>
                <p className="mt-3 text-sm leading-relaxed text-[#d8cfc3]">
                  Start from the composer, attach supporting media, and route through the same editorial checks your team
                  already uses.
                </p>
              </div>
              <div className="flex flex-wrap justify-start gap-3 lg:justify-end">
                <Link href="/create/mediaDistribution" className="inline-flex rounded-full bg-[#f97300] px-6 py-3 text-sm font-semibold text-[#1a0f0c]">
                  Create a release
                </Link>
                <Link href="/pricing" className="inline-flex rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white">
                  View pricing
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

