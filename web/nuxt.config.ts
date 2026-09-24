// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxtjs/sanity'],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2026-06-30',

  nitro: {
    preset: 'cloudflare-module',
    cloudflare: {
      // Nitro writes .output/server/wrangler.json (merged with ./wrangler.jsonc)
      // so a plain `wrangler deploy` works from the project root.
      deployConfig: true,
      nodeCompat: true
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  sanity: {
    projectId: 'iiacawsi',
    dataset: 'production',
    apiVersion: '2026-09-24',
    useCdn: true,
    visualEditing: {
      // Server-only viewer token; never exposed to the client bundle.
      token: process.env.SANITY_API_READ_TOKEN,
      studioUrl: process.env.SANITY_STUDIO_URL || 'http://localhost:3333',
      stega: true,
      mode: 'live-visual-editing'
      // previewMode defaults to /preview/enable and /preview/disable
    }
  }
})
