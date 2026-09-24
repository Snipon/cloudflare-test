import type { ClientPerspective, QueryParams } from '@sanity/client'

interface QueryBody {
  query?: string
  params?: QueryParams
  options?: {
    perspective?: ClientPerspective
    token?: string
    stega?: boolean
    resultSourceMap?: boolean | 'withKeyArraySelector'
  }
}

/**
 * Server-side GROQ endpoint used by `useSanityQuery` (see `sanity.queryEndpoint`
 * in nuxt.config). The browser never talks to the Sanity API directly for
 * published content; during SSR the composable forwards here as well.
 *
 * Only queries that exist in the codebase (found via `defineQuery`/`groq` at
 * build time) are accepted, so this is not an open GROQ proxy. Draft
 * perspectives are honoured only when the caller supplies its own token
 * (the SSR preview path does); anonymous callers always get published content.
 */
export default defineEventHandler(async (event) => {
  const { query, params = {}, options = {} } = await readBody<QueryBody>(event) ?? {}

  if (typeof query !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Missing query' })
  }

  await validateSanityQuery(query)

  const token = options.token || undefined
  const perspective: ClientPerspective = token && options.perspective ? options.perspective : 'published'

  const { client } = useSanity(event)
  return client
    .withConfig({ token, useCdn: !token })
    .fetch(query, params, {
      filterResponse: false,
      perspective,
      stega: token ? options.stega : false,
      resultSourceMap: token ? options.resultSourceMap : undefined
    })
})
