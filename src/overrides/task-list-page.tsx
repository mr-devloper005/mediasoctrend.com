import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'
import { fetchTaskPosts } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import type { SitePost } from '@/lib/site-connector'

export const TASK_LIST_PAGE_OVERRIDE_ENABLED = true

function excerpt(text?: string | null, max = 140) {
  const value = (text || '').trim()
  if (!value) return 'Open the release for the complete story.'
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

function filterByPeriod(posts: SitePost[], period?: string): SitePost[] {
  if (!period || period === 'all') return posts
  const now = Date.now()
  const days: Record<string, number> = { '7': 7, '30': 30, '90': 90, '365': 365 }
  const d = days[period]
  if (!d) return posts
  const cutoff = now - d * 86400000
  return posts.filter((p) => new Date(p.publishedAt || 0).getTime() >= cutoff)
}

export async function TaskListPageOverride({
  category,
  period,
}: {
  task: TaskKey
  category?: string
  period?: string
}) {
  const postsRaw = await fetchTaskPosts('mediaDistribution', 48, { fresh: true })
  const normalizedCategory = category ? normalizeCategory(category) : 'all'

  let posts = postsRaw
  if (normalizedCategory !== 'all') {
    posts = posts.filter((post) => {
      const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
      const value = typeof content.category === 'string' ? normalizeCategory(content.category) : ''
      return value === normalizedCategory
    })
  }
  posts = filterByPeriod(posts, period)

  return (
    <div className="min-h-screen bg-[#e2dfd0] text-[#2a211c]">
      <NavbarShell />
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <header className="border-b border-[#32012f]/10 pb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f97300]">Newsroom archive</p>
          <h1 className="font-display mt-3 text-4xl font-semibold tracking-[-0.03em] text-[#32012f]">Press media & updates</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#524c42]">
            Filter by topic or recency, or jump to search for keyword matches across every published story.
          </p>

          <form
            className="mt-8 flex flex-col gap-4 rounded-2xl border border-[#32012f]/10 bg-[#fbf9f4] p-4 shadow-sm sm:flex-row sm:items-end"
            method="get"
            action="/updates"
          >
            <div className="flex-1">
              <label htmlFor="category" className="text-xs font-semibold uppercase tracking-[0.16em] text-[#524c42]">
                Category
              </label>
              <select
                id="category"
                name="category"
                defaultValue={normalizedCategory === 'all' ? 'all' : normalizedCategory}
                className="mt-2 h-11 w-full rounded-xl border border-[#32012f]/15 bg-white px-3 text-sm text-[#2a211c]"
              >
                <option value="all">All categories</option>
                {CATEGORY_OPTIONS.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label htmlFor="period" className="text-xs font-semibold uppercase tracking-[0.16em] text-[#524c42]">
                Published
              </label>
              <select
                id="period"
                name="period"
                defaultValue={period || 'all'}
                className="mt-2 h-11 w-full rounded-xl border border-[#32012f]/15 bg-white px-3 text-sm text-[#2a211c]"
              >
                <option value="all">Any time</option>
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="365">Last 12 months</option>
              </select>
            </div>
            <button
              type="submit"
              className="h-11 rounded-full bg-[#32012f] px-6 text-sm font-semibold text-[#fdf8f2] transition hover:bg-[#4a1545]"
            >
              Apply
            </button>
            <Link
              href="/search"
              className="inline-flex h-11 items-center justify-center rounded-full border border-[#f97300] px-5 text-sm font-semibold text-[#c2410c] transition hover:bg-[#f97300]/10"
            >
              Keyword search
            </Link>
          </form>
        </header>

        {posts.length ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/updates/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#32012f]/8 bg-[#fbf9f4] shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#f97300]/35"
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
                  <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#f97300]">
                    <span>{getPostCategoryLabel(post)}</span>
                  </div>
                  <h2 className="font-display mt-2 text-lg font-semibold leading-snug text-[#32012f] group-hover:text-[#c2410c]">{post.title}</h2>
                  <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-[#524c42]">{excerpt(post.summary)}</p>
                  <span className="mt-4 text-sm font-semibold text-[#32012f]">Read release →</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-dashed border-[#32012f]/20 bg-white/50 p-12 text-center text-[#524c42]">
            No releases match these filters yet.{' '}
            <Link href="/updates" className="font-semibold text-[#c2410c] underline">
              Clear filters
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

