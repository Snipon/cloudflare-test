import {defineLocations, type PresentationPluginOptions} from 'sanity/presentation'

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
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
