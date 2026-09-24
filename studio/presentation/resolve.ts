import {defineLocations, type PresentationPluginOptions} from 'sanity/presentation'

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    siteSettings: defineLocations({
      select: {title: 'title'},
      resolve: (doc) => ({
        locations: [{title: doc?.title || 'Home', href: '/'}],
      }),
    }),
    smurf: defineLocations({
      select: {name: 'name', slug: 'slug.current'},
      resolve: (doc) => ({
        locations: [
          {title: doc?.name || 'Untitled smurf', href: `/smurfs/${doc?.slug}`},
          {title: 'All smurfs', href: '/'},
        ],
      }),
    }),
  },
}
