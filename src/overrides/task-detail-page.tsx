import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Facebook, Linkedin, Mail, Twitter } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'
import { fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { formatRichHtml, RichContent } from '@/components/shared/rich-content'
import { SITE_CONFIG } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'

export const TASK_DETAIL_PAGE_OVERRIDE_ENABLED = true

const isValidImageUrl = (value?: string | null) =>
  typeof value === 'string' && (value.startsWith('/') || /^https?:\/\//i.test(value))

const getContent = (post: SitePost) => {
  const content = post.content && typeof post.content === 'object' ? post.content : {}
  return content as Record<string, unknown>
}

const getImageUrls = (post: SitePost, content: Record<string, unknown>) => {
  const media = Array.isArray(post.media) ? post.media : []
  const mediaImages = media.map((item) => item?.url).filter((url): url is string => isValidImageUrl(url))
  const contentImages = Array.isArray(content.images)
    ? content.images.filter((url): url is string => isValidImageUrl(url as string))
    : []
  const merged = [...mediaImages, ...contentImages]
  if (merged.length) return merged
  if (isValidImageUrl(content.logo as string)) return [content.logo as string]
  return [] as string[]
}

export async function TaskDetailPageOverride({ slug }: { task: TaskKey; slug: string }) {
  const post = await fetchTaskPostBySlug('mediaDistribution', slug)
  if (!post) notFound()

  const content = getContent(post)
  const html = formatRichHtml((content.body as string) || post.summary || '', 'Full article content will appear here.')
  const subtitle =
    (typeof content.excerpt === 'string' && content.excerpt.trim()) ||
    (post.summary && post.summary.trim()) ||
    ''

  const images = getImageUrls(post, content)
  const featured = images[0] || null

  const related = (await fetchTaskPosts('mediaDistribution', 12, { fresh: true }))
    .filter((item) => item.slug !== slug)
    .slice(0, 3)

  const base = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const canonical = `${base}/updates/${slug}`
  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonical)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(canonical)}&text=${encodeURIComponent(post.title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonical)}`,
    email: `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(canonical)}`,
  }

  const dateLabel = new Date(post.publishedAt || Date.now()).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const category =
    (typeof content.category === 'string' && content.category.trim()) ||
    post.tags?.find((t) => typeof t === 'string') ||
    'Press release'

  const imageForSchema =
    featured && /^https?:\/\//i.test(featured)
      ? featured
      : featured
        ? `${base}${featured.startsWith('/') ? featured : `/${featured}`}`
        : undefined

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    datePublished: post.publishedAt || undefined,
    dateModified: post.publishedAt || undefined,
    author: { '@type': 'Person', name: post.authorName || SITE_CONFIG.name },
    image: imageForSchema ? [imageForSchema] : undefined,
    articleSection: category,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
  }

  return (
    <div className="min-h-screen bg-[#e2dfd0] text-[#2a211c]">
      <NavbarShell />
      <SchemaJsonLd data={schema} />

      <article>
        <header className="border-b border-[#32012f]/10 bg-[#32012f] py-12 text-[#fdf8f2] sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f97300]">{String(category)}</p>
            <h1 className="font-display mt-4 text-3xl font-semibold leading-[1.12] tracking-[-0.02em] sm:text-4xl lg:text-[2.4rem]">
              {post.title}
            </h1>
            {subtitle ? <p className="mt-5 text-lg leading-relaxed text-[#e0d8cc]">{subtitle}</p> : null}
            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-[#c9bfb0]">
              <span>By {post.authorName || 'Media desk'}</span>
            </div>
          </div>
        </header>

        {featured ? (
          <div className="mx-auto max-w-5xl px-4 pt-10 sm:px-6">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-[#32012f]/10 shadow-[0_24px_60px_rgba(32,8,28,0.12)]">
              <ContentImage src={featured} alt={post.title} fill className="object-cover" />
            </div>
          </div>
        ) : null}

        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12">
          <div>
            <div className="flex flex-wrap items-center gap-2 border-b border-[#32012f]/10 pb-6">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#524c42]">Share</span>
              <div className="flex flex-wrap gap-2">
                <a
                  href={shareLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#32012f]/15 bg-[#fbf9f4] text-[#32012f] transition hover:border-[#f97300]/50 hover:text-[#c2410c]"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={shareLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#32012f]/15 bg-[#fbf9f4] text-[#32012f] transition hover:border-[#f97300]/50 hover:text-[#c2410c]"
                  aria-label="Share on X"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href={shareLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#32012f]/15 bg-[#fbf9f4] text-[#32012f] transition hover:border-[#f97300]/50 hover:text-[#c2410c]"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href={shareLinks.email}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#32012f]/15 bg-[#fbf9f4] text-[#32012f] transition hover:border-[#f97300]/50 hover:text-[#c2410c]"
                  aria-label="Email this story"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
              <p className="mt-3 text-xs text-[#6b6258]">
                Permalink:{' '}
                <a href={canonical} className="font-medium text-[#c2410c] underline-offset-2 hover:underline">
                  {canonical.replace(/^https?:\/\//, '')}
                </a>
              </p>
            </div>

            <RichContent
              html={html}
              className="article-content mt-8 max-w-none text-base leading-[1.75] text-[#2a211c] prose-headings:font-display"
            />
          </div>

          <aside className="space-y-6 lg:pt-4">
            <div className="rounded-2xl border border-[#32012f]/10 bg-[#fbf9f4] p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#524c42]">On this desk</p>
              <p className="mt-3 text-sm leading-relaxed text-[#524c42]">
                Looking for more announcements? Browse the archive or run a keyword search across every published release.
              </p>
              <div className="mt-5 flex flex-col gap-2">
                <Link href="/updates" className="text-sm font-semibold text-[#c2410c] hover:underline">
                  Latest news →
                </Link>
                <Link href="/search" className="text-sm font-semibold text-[#c2410c] hover:underline">
                  Search →
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {related.length ? (
          <section className="border-t border-[#32012f]/10 bg-[#ebe7dc] py-14">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="flex items-end justify-between gap-4">
                <h2 className="font-display text-2xl font-semibold text-[#32012f]">Related releases</h2>
                <Link href="/updates" className="text-sm font-semibold text-[#c2410c] hover:underline">
                  View all
                </Link>
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {related.map((item) => (
                  <Link
                    key={item.id}
                    href={`/updates/${item.slug}`}
                    className="group overflow-hidden rounded-2xl border border-[#32012f]/10 bg-[#fbf9f4] shadow-sm transition hover:border-[#f97300]/35"
                  >
                    <div className="relative aspect-[16/10]">
                      <ContentImage
                        src={getImageUrls(item, getContent(item))[0] || 'https://img.freepik.com/free-photo/business-team-meeting-boardroom_23-2149095375.jpg'}
                        alt={item.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#f97300]">
                        {getContent(item).category ? String(getContent(item).category) : 'Update'}
                      </p>
                      <h3 className="font-display mt-2 text-lg font-semibold leading-snug text-[#32012f]">{item.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </article>

      <Footer />
    </div>
  )
}

