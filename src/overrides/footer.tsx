import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'

export const FOOTER_OVERRIDE_ENABLED = true

const columns = [
  {
    title: 'Distribution',
    links: [
      { label: 'Press releases', href: '/updates' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Search', href: '/search' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Press kit', href: '/press' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Cookies', href: '/cookies' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Sign in', href: '/login' },
      { label: 'Create post', href: '/create/mediaDistribution' },
      { label: 'Help', href: '/help' },
    ],
  },
]

export function FooterOverride() {
  return (
    <footer className="border-t border-[#32012f]/30 bg-[#32012f] text-[#e8e0d4]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-xl font-semibold text-[#fdf8f2]">{SITE_CONFIG.name}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#c9bfb0]">{SITE_CONFIG.description}</p>
            <p className="mt-6 text-xs uppercase tracking-[0.22em] text-[#a89f92]">Media desk</p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f97300]">{col.title}</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[#e8e0d4] transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-[#a89f92] sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="https://twitter.com" className="transition hover:text-white" target="_blank" rel="noreferrer">
              X / Twitter
            </a>
            <a href="https://linkedin.com" className="transition hover:text-white" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
