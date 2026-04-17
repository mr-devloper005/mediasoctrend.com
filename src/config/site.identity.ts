export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'gv6wsf0yk4',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Media Soc Trend',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Independent media updates',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'A simple newsroom-style publication for announcements, coverage, and media updates on Media Soc Trend.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'mediasoctrend.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://mediasoctrend.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || '',
} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const
