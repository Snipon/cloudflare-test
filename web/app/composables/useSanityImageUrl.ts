import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'

/**
 * Returns a builder for Sanity image URLs that honours hotspot and crop.
 * Usage: `urlFor(image).width(400).height(400).url()`
 */
export function useSanityImageUrl() {
  const { client } = useSanity()
  const builder = createImageUrlBuilder(client)
  return (source: SanityImageSource) => builder.image(source).auto('format')
}
