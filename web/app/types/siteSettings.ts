import type { SITE_SETTINGS_QUERY_RESULT } from '~~/sanity.types'

export type SiteSettings = NonNullable<SITE_SETTINGS_QUERY_RESULT>
export type HeroImage = SiteSettings['heroImage']
