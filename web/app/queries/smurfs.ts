import { defineQuery } from 'groq'

const SMURF_IMAGE = /* groq */ `image {
  asset,
  hotspot,
  crop,
  alt,
  "lqip": asset->metadata.lqip
}`

export const SMURFS_QUERY = defineQuery(`*[_type == "smurf" && defined(slug.current)] | order(name asc) {
  _id,
  name,
  slug,
  personality,
  ${SMURF_IMAGE}
}`)

export const SMURF_QUERY = defineQuery(`*[_type == "smurf" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  personality,
  ${SMURF_IMAGE}
}`)
