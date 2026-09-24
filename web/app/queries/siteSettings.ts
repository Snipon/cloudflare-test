import { defineQuery } from 'groq'

export const SITE_SETTINGS_QUERY = defineQuery(`*[_id == "siteSettings"][0] {
  title,
  tagline,
  heroImage {
    asset,
    hotspot,
    crop,
    alt,
    "lqip": asset->metadata.lqip
  }
}`)
