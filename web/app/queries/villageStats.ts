import { defineQuery } from 'groq'

export const VILLAGE_STATS_QUERY = defineQuery(`{
  "residents": count(*[_type == "smurf"]),
  "portraits": count(*[_type == "smurf" && defined(image.asset)]),
  "newest": *[_type == "smurf" && defined(slug.current)] | order(_createdAt desc)[0] {
    name,
    slug,
    _createdAt
  },
  "lastUpdated": *[_type == "smurf"] | order(_updatedAt desc)[0]._updatedAt
}`)
