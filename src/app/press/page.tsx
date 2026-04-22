'use client'

import Image from 'next/image'
import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SITE_CONFIG } from '@/lib/site-config'
import { useToast } from '@/components/ui/use-toast'

const brandAssets = [
  {
    id: 'logo-mark',
    title: 'Logo mark',
    description: 'Vector-friendly placeholder mark for light layouts.',
    fileType: 'SVG',
    href: '/placeholder-logo.svg',
  },
  {
    id: 'og-default',
    title: 'Open Graph default',
    description: 'Default share image path configured for this site.',
    fileType: 'Asset',
    href: SITE_CONFIG.defaultOgImage.startsWith('/') ? SITE_CONFIG.defaultOgImage : `/${SITE_CONFIG.defaultOgImage}`,
  },
] as const

export default function PressPage() {
  const { toast } = useToast()

  return (
    <div className="min-h-screen bg-[#e2dfd0] text-[#2a211c]">
      <NavbarShell />
      <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <header className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f97300]">Press</p>
          <h1 className="font-display mt-3 text-4xl font-semibold text-[#32012f]">Brand resources</h1>
          <p className="mt-4 text-sm leading-relaxed text-[#524c42]">
            Approved marks and default imagery for media coverage of {SITE_CONFIG.name}. Need a custom angle or executive
            comment? Email{' '}
            <a className="font-semibold text-[#c2410c] hover:underline" href={`mailto:press@${SITE_CONFIG.domain}`}>
              press@{SITE_CONFIG.domain}
            </a>
            .
          </p>
        </header>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-2xl border border-[#32012f]/10 bg-[#fbf9f4] p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-semibold text-[#32012f]">Downloads</h2>
            <div className="mt-6 space-y-4">
              {brandAssets.map((asset) => (
                <div key={asset.id} className="flex flex-col gap-3 rounded-xl border border-[#32012f]/10 bg-white/80 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#32012f]">{asset.title}</p>
                    <p className="mt-1 text-xs text-[#524c42]">{asset.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{asset.fileType}</Badge>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={asset.href} target="_blank" rel="noreferrer">
                        Open
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      className="bg-[#f97300] text-[#1a0f0c] hover:bg-[#f97300]/90"
                      onClick={() =>
                        toast({
                          title: 'Download',
                          description: `Save ${asset.title} from the opened file.`,
                        })
                      }
                    >
                      Save
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-[#32012f]/10 shadow-md">
              <Image src="/brand/news-grid.jpg" alt="Newsroom grid preview" fill className="object-cover" sizes="480px" />
            </div>
            <div className="rounded-2xl border border-[#32012f]/10 bg-[#32012f] p-6 text-[#f4ede3]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f97300]">Coverage</p>
              <p className="mt-3 text-sm leading-relaxed text-[#d8cfc3]">
                For interview requests or data points about readership, include your deadline and outlet in the subject line.
              </p>
              <Button asChild variant="secondary" className="mt-5 w-full bg-[#f97300] text-[#1a0f0c] hover:bg-[#f97300]/90">
                <Link href="/contact">Contact communications</Link>
              </Button>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  )
}

