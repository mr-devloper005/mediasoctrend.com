'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, Search, X } from 'lucide-react'

export const NAVBAR_OVERRIDE_ENABLED = true

const navLinks = [
  { label: 'Press releases', href: '/updates' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function NavbarOverride() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[#32012f]/20 bg-[#32012f] text-[#fdf8f2] shadow-[0_8px_32px_rgba(18,4,16,0.35)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2 font-display text-lg font-semibold tracking-tight sm:text-xl"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f97300] text-xs font-bold text-[#1a0f0c] shadow-inner ring-2 ring-[#fdf8f2]/20">
            M
          </span>
          <span className="text-[#fdf8f2] transition group-hover:text-white">
            media<span className="text-[#f97300]">Soc</span>Trend
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-[#e8e0d4] transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/search"
            className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[#e8e0d4] transition hover:bg-white/10 hover:text-white"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </Link>
          <Link
            href="/login"
            className="ml-2 rounded-full px-3 py-2 text-sm font-medium text-[#e8e0d4] transition hover:text-white"
          >
            Sign in
          </Link>
          <Link
            href={`/create/mediaDistribution`}
            className="ml-1 inline-flex items-center rounded-full border border-[#f97300] bg-[#f97300] px-4 py-2 text-sm font-semibold text-[#1a0f0c] shadow-[0_4px_20px_rgba(249,115,0,0.35)] transition hover:brightness-105"
          >
            Submit release
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/search"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-[#2a0c28] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-3 text-base font-medium text-[#f4ede3]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/login"
              className="rounded-xl px-3 py-3 text-base font-medium text-[#f4ede3]"
              onClick={() => setOpen(false)}
            >
              Sign in
            </Link>
            <Link
              href={`/create/mediaDistribution`}
              className="mt-2 inline-flex justify-center rounded-full bg-[#f97300] px-4 py-3 text-center text-sm font-semibold text-[#1a0f0c]"
              onClick={() => setOpen(false)}
            >
              Submit release
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  )
}
