import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle2, Newspaper } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import type { SitePost } from '@/lib/site-connector'

export const HOME_PAGE_OVERRIDE_ENABLED = true

function excerpt(text?: string | null, max = 160) {
  const value = (text || '').trim()
  if (!value) return 'Read the announcement for the full story and supporting detail.'
  return value.length > max ? value.slice(0, max - 1).trimEnd() + '…' : value
}

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage =
    typeof post?.content === 'object' && post?.content && Array.isArray((post.content as { images?: string[] }).images)
      ? (post.content as { images?: string[] }).images?.find((url) => typeof url === 'string' && url)
      : null
  const logo =
    typeof post?.content === 'object' && post?.content && typeof (post.content as { logo?: string }).logo === 'string'
      ? (post.content as { logo?: string }).logo
      : null
  return mediaUrl || contentImage || logo || '/brand/news-grid.jpg'
}

function getPostCategoryLabel(post: SitePost): string {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const cat = content.category
  if (typeof cat === 'string' && cat.trim()) return cat.trim()
  const tag = post.tags?.find((t) => typeof t === 'string' && t !== 'mediaDistribution')
  if (typeof tag === 'string') return tag
  return 'Press'
}

export async function HomePageOverride() {
  const posts = await fetchTaskPosts('mediaDistribution', 16, { fresh: true, revalidate: 120 })
  const featured = posts[0]
  const grid = posts.slice(1, 13)

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      logo: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${SITE_CONFIG.defaultOgImage}`,
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ]

  const benefits = [
    'Editorial-style formatting for announcements',
    'Searchable archive with category filters',
    'Responsive reading on every device',
    'Clear metadata: date, topic, and byline',
  ]

  return (
    <div className="min-h-screen bg-[#e2dfd0] text-[#2a211c]">
      <NavbarShell />
      <SchemaJsonLd data={schemaData} />

      <section className="border-b border-[#32012f]/10 bg-[#f6f3ea]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#32012f]/15 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#524c42]">
              <Newspaper className="h-3.5 w-3.5 text-[#f97300]" />
              {siteContent.hero.badge}
            </p>
            <h1 className="font-display mt-6 text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-[#32012f] sm:text-5xl">
              Stories that move markets — published with clarity.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#524c42]">{SITE_CONFIG.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/updates"
                className="inline-flex items-center gap-2 rounded-full bg-[#f97300] px-6 py-3 text-sm font-semibold text-[#1a0f0c] shadow-[0_8px_28px_rgba(249,115,0,0.35)] transition hover:brightness-105"
              >
                Browse releases
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#32012f]/10 shadow-[0_24px_60px_rgba(32,8,28,0.12)]">
            <Image
              src="/brand/home-hero.jpg"
              alt="Editorial workspace and publishing"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 480px"
              priority
            />
          </div>
        </div>
      </section>

      <section className="bg-[#32012f] py-10 text-center text-[#f4ede3]">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#f97300]">Distribution you can trust</p>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#c9bfb0]">
          A calm, newsroom-grade surface for organizations that publish often and need readers to scan fast.
        </p>
        <div className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-6 text-sm font-medium text-[#e0d8cc] opacity-90">
          {['Wire-ready structure', 'Category-aware archive', 'Shareable story pages'].map((label) => (
            <span key={label} className="rounded-full border border-white/10 px-4 py-2">
              {label}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-col gap-4 border-b border-[#32012f]/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] text-[#32012f]">Latest from the wire</h2>
            <p className="mt-2 max-w-xl text-sm text-[#524c42]">Fresh announcements and coverage, shown as a scan-friendly grid.</p>
          </div>
          <Link href="/updates" className="text-sm font-semibold text-[#c2410c] hover:underline">
            Open full archive
          </Link>
        </div>

        {featured ? (
          <Link
            href={`/updates/${featured.slug}`}
            className="mt-10 grid gap-8 overflow-hidden rounded-2xl border border-[#32012f]/10 bg-[#fbf9f4] p-6 shadow-[0_18px_50px_rgba(32,8,28,0.06)] transition hover:border-[#f97300]/40 md:grid-cols-[1.1fr_0.9fr] md:p-8"
          >
            <div className="relative aspect-[16/10] min-h-[200px] overflow-hidden rounded-xl">
              <ContentImage src={getPostImage(featured)} alt={featured.title} fill className="object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f97300]">
                {getPostCategoryLabel(featured)}
              </p>
              <h3 className="font-display mt-3 text-2xl font-semibold leading-snug text-[#32012f] md:text-3xl">{featured.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-[#524c42]">{excerpt(featured.summary, 220)}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#32012f]">
                Continue reading <ArrowRight className="h-4 w-4 text-[#f97300]" />
              </span>
            </div>
          </Link>
        ) : (
          <p className="mt-10 rounded-2xl border border-dashed border-[#32012f]/20 bg-white/50 p-10 text-center text-[#524c42]">
            New releases will appear here once published.
          </p>
        )}

        {grid.length ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {grid.map((post) => (
              <Link
                key={post.id}
                href={`/updates/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#32012f]/8 bg-[#fbf9f4] shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#f97300]/35 hover:shadow-[0_16px_40px_rgba(32,8,28,0.08)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <ContentImage
                    src={getPostImage(post)}
                    alt={post.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f97300]">
                    {getPostCategoryLabel(post)}
                  </p>
                  <h3 className="font-display mt-2 text-lg font-semibold leading-snug text-[#32012f] group-hover:text-[#c2410c]">{post.title}</h3>
                  <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-[#524c42]">{excerpt(post.summary, 140)}</p>

                </div>
              </Link>
            ))}
          </div>
        ) : null}
      </section>

      <section className="border-y border-[#32012f]/10 bg-[#ebe7dc]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-semibold text-[#32012f]">Built for busy communications teams</h2>
            <ul className="mt-6 space-y-3">
              {benefits.map((line) => (
                <li key={line} className="flex gap-3 text-sm leading-relaxed text-[#524c42]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#f97300]" aria-hidden />
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[#32012f]/10 bg-[#32012f] p-8 text-[#f4ede3] shadow-[0_24px_60px_rgba(32,8,28,0.2)]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f97300]">Ready to publish?</p>
            <p className="mt-4 text-lg font-medium leading-relaxed">
              Use the composer to draft a release, attach media, and route it through your existing workflow.
            </p>
            <Link
              href="/create/mediaDistribution"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#f97300] px-6 py-3 text-sm font-semibold text-[#1a0f0c] transition hover:brightness-105"
            >
              Start a release
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}


