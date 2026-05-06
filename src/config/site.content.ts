import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Press distribution newsroom',
  },
  footer: {
    tagline: 'Announcements worth reading twice',
  },
  hero: {
    badge: 'Wire & desk',
    title: ['Clear releases. Calm layouts. Fast scanning for busy readers.'],
    description:
      'mediaSocTrend is a press-style publishing surface for organizations that need credible pages, structured archives, and share-friendly stories.',
    primaryCta: {
      label: 'Browse releases',
      href: '/updates',
    },
    secondaryCta: {
      label: 'Talk to the desk',
      href: '/contact',
    },
    searchPlaceholder: 'Search announcements',
    focusLabel: 'Latest',
    featureCardBadge: 'Desk note',
    featureCardTitle: 'New stories surface on the homepage automatically.',
    featureCardDescription:
      'The front page behaves like a modern newsroom: headline pacing, generous whitespace, and a grid that keeps scanning effortless.',
  },
  home: {
    metadata: {
      title: 'mediaSocTrend — press releases & media announcements',
      description:
        'Read the latest press releases and announcements from mediaSocTrend—structured like a newsroom, tuned for clarity and reach.',
      openGraphTitle: 'mediaSocTrend — press releases & media announcements',
      openGraphDescription:
        'A press distribution experience with editorial typography, responsive grids, and share-ready story pages.',
      keywords: ['press releases', 'media announcements', 'newsroom', 'mediaSocTrend', 'corporate communications'],
    },
    introBadge: 'Why it exists',
    introTitle: 'Publishing that still feels human on the page.',
    introParagraphs: [
      'Communications teams ship more announcements than ever. Readers, meanwhile, have less patience for cluttered layouts and noisy feeds.',
      'This site keeps the interface quiet: strong type, obvious hierarchy, and archive tools that help people find the right release in seconds.',
      'Under the hood it stays compatible with the broader platform—so you keep workflows, routing, and integrations intact.',
    ],
    sideBadge: 'What you get',
    sidePoints: [
      'Editorial article pages with featured imagery and share tools.',
      'Filterable archive with category and recency controls.',
      'Pricing and contact surfaces that match the product story.',
      'Responsive behavior from mobile to ultrawide.',
    ],
    primaryLink: {
      label: 'Open archive',
      href: '/updates',
    },
    secondaryLink: {
      label: 'View pricing',
      href: '/pricing',
    },
  },
  cta: {
    badge: 'Next step',
    title: 'Need distribution guidance or a custom bundle?',
    description: 'Tell us about timelines, audiences, and assets—we will point you to the right tier or add-on configuration.',
    primaryCta: {
      label: 'Contact the desk',
      href: '/contact',
    },
    secondaryCta: {
      label: 'Browse releases',
      href: '/updates',
    },
  },
  taskSectionHeading: 'Latest releases',
  taskSectionDescriptionSuffix: 'Fresh announcements from the wire.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles',
    description: 'Read the latest posts and long-form updates.',
  },
  listing: {
    title: 'Listings',
    description: 'Explore listings and directory-style entries.',
  },
  classified: {
    title: 'Classifieds',
    description: 'Browse classifieds and short-form notices.',
  },
  image: {
    title: 'Images',
    description: 'Browse image-led updates and visual posts.',
  },
  profile: {
    title: 'Profiles',
    description: 'View profile pages and public identities.',
  },
  sbm: {
    title: 'Bookmarks',
    description: 'Browse curated resources and saved links.',
  },
  pdf: {
    title: 'Resources',
    description: 'Open PDFs and downloadable files.',
  },
  mediaDistribution: {
    title: 'Press media',
    description: 'Browse the latest press media and media announcements.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: { title: 'Listings', paragraphs: ['Directory entries and service pages.'], links: [{ label: 'Home', href: '/' }] },
  article: { title: 'Articles', paragraphs: ['General long-form article feed.'], links: [{ label: 'Home', href: '/' }] },
  classified: { title: 'Classifieds', paragraphs: ['Short-form posts and notices.'], links: [{ label: 'Home', href: '/' }] },
  image: { title: 'Images', paragraphs: ['Image-first posts and galleries.'], links: [{ label: 'Home', href: '/' }] },
  profile: { title: 'Profiles', paragraphs: ['Profile pages and identity surfaces.'], links: [{ label: 'Home', href: '/' }] },
  sbm: { title: 'Bookmarks', paragraphs: ['Curated saved links and references.'], links: [{ label: 'Home', href: '/' }] },
  pdf: { title: 'Resources', paragraphs: ['Downloadable files and documents.'], links: [{ label: 'Home', href: '/' }] },
  social: { title: 'Social', paragraphs: ['Short updates and activity.'], links: [{ label: 'Home', href: '/' }] },
  comment: { title: 'Comments', paragraphs: ['Commentary and response posts.'], links: [{ label: 'Home', href: '/' }] },
  org: { title: 'Organizations', paragraphs: ['Organization pages and entities.'], links: [{ label: 'Home', href: '/' }] },
  mediaDistribution: {
    title: 'Press media',
    paragraphs: [
      'This archive lists every published announcement with category context, publication date, and a short preview before you open the full story.',
      'Use filters to focus on a topic or time window, or jump to keyword search when you know exactly what you are looking for.',
    ],
    links: [
      { label: 'Home', href: '/' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
}
