export const siteTaskDefinitions = [
  {
    key: 'mediaDistribution',
    label: 'Press releases',
    route: '/updates',
    description: 'Official announcements, launches, and media coverage in a readable newsroom format.',
    contentType: 'mediaDistribution',
    enabled: true,
  },
] as const

export const siteTaskViews = {
  mediaDistribution: '/updates',
} as const
