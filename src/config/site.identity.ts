export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'gv6wsf0yk4',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'mediaSocTrend',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Press releases & media announcements',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'mediaSocTrend helps organizations publish credible press releases with editorial layouts, structured archives, and share-ready story pages.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'mediasoctrend.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://mediasoctrend.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || '',
} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: 'https://img.freepik.com/free-photo/business-team-meeting-boardroom_23-2149095375.jpg',
} as const

