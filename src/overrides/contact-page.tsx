import Image from 'next/image'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

const deskMail = `press@${SITE_CONFIG.domain}`
const helloMail = `hello@${SITE_CONFIG.domain}`

export function ContactPageOverride() {
  const mailtoAction = `mailto:${helloMail}`

  return (
    <div className="min-h-screen bg-[#e2dfd0] text-[#2a211c]">
      <NavbarShell />
      <main>
        <section className="border-b border-[#32012f]/10 bg-[#f6f3ea]">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-14 lg:py-20">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f97300]">Contact</p>
              <h1 className="font-display mt-3 text-4xl font-semibold tracking-[-0.03em] text-[#32012f] sm:text-5xl">
                Talk with the media desk
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#524c42]">
                For distribution questions, editorial review, or partnership conversations, reach the team directly. We route
                requests to the right lane—no generic ticket black hole.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#32012f]/10 bg-white/80 p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#524c42]">Press &amp; editorial</p>
                  <a className="mt-3 block text-lg font-semibold text-[#c2410c] hover:underline" href={`mailto:${deskMail}`}>
                    {deskMail}
                  </a>
                </div>
                <div className="rounded-2xl border border-[#32012f]/10 bg-white/80 p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#524c42]">General</p>
                  <a className="mt-3 block text-lg font-semibold text-[#c2410c] hover:underline" href={`mailto:${helloMail}`}>
                    {helloMail}
                  </a>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/5] max-h-[420px] overflow-hidden rounded-2xl border border-[#32012f]/10 shadow-[0_24px_60px_rgba(32,8,28,0.12)] lg:max-h-none">
              <Image
                src="/brand/contact-visual.jpg"
                alt="Team collaboration"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 400px"
                priority
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <form action={mailtoAction} method="post" encType="text/plain" className="rounded-2xl border border-[#32012f]/10 bg-[#fbf9f4] p-6 shadow-sm sm:p-8">
              <h2 className="font-display text-xl font-semibold text-[#32012f]">Send a note</h2>
              <p className="mt-2 text-sm text-[#524c42]">
                Opens your email app with a pre-filled message. You can also email us directly at {helloMail}.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1.5 text-sm">
                  <span className="font-medium text-[#524c42]">First name</span>
                  <input
                    name="first_name"
                    className="h-11 rounded-xl border border-[#32012f]/15 bg-white px-3 text-[#2a211c]"
                    autoComplete="given-name"
                  />
                </label>
                <label className="grid gap-1.5 text-sm">
                  <span className="font-medium text-[#524c42]">Last name</span>
                  <input
                    name="last_name"
                    className="h-11 rounded-xl border border-[#32012f]/15 bg-white px-3 text-[#2a211c]"
                    autoComplete="family-name"
                  />
                </label>
              </div>
              <label className="mt-4 grid gap-1.5 text-sm">
                <span className="font-medium text-[#524c42]">Work email</span>
                <input
                  name="email"
                  type="email"
                  required
                  className="h-11 rounded-xl border border-[#32012f]/15 bg-white px-3 text-[#2a211c]"
                  autoComplete="email"
                />
              </label>
              <label className="mt-4 grid gap-1.5 text-sm">
                <span className="font-medium text-[#524c42]">Company</span>
                <input name="company" className="h-11 rounded-xl border border-[#32012f]/15 bg-white px-3 text-[#2a211c]" />
              </label>
              <label className="mt-4 grid gap-1.5 text-sm">
                <span className="font-medium text-[#524c42]">How can we help?</span>
                <textarea
                  name="body"
                  rows={5}
                  className="rounded-xl border border-[#32012f]/15 bg-white px-3 py-2 text-[#2a211c]"
                  placeholder="Share timelines, links, and what success looks like."
                />
              </label>
              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#f97300] px-6 py-3 text-sm font-semibold text-[#1a0f0c] transition hover:brightness-105 sm:w-auto"
              >
                Compose email
              </button>
            </form>

            <div className="space-y-6">
              <div className="rounded-2xl border border-[#32012f]/10 bg-[#32012f] p-8 text-[#f4ede3]">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f97300]">Response window</p>
                <p className="mt-3 text-sm leading-relaxed text-[#d8cfc3]">
                  Most inquiries receive a first reply within two business days. For time-sensitive releases, mention the target
                  publish window in your subject line.
                </p>
              </div>
              <div className="rounded-2xl border border-[#32012f]/10 bg-white/70 p-6">
                <p className="text-sm font-semibold text-[#32012f]">Prefer to browse first?</p>
                <ul className="mt-3 space-y-2 text-sm text-[#524c42]">
                  <li>
                    <a className="font-medium text-[#c2410c] hover:underline" href="/pricing">
                      Compare distribution tiers
                    </a>
                  </li>
                  <li>
                    <a className="font-medium text-[#c2410c] hover:underline" href="/updates">
                      Read recent releases
                    </a>
                  </li>
                  <li>
                    <a className="font-medium text-[#c2410c] hover:underline" href="/about">
                      About the newsroom
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

