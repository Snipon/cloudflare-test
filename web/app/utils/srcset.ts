/**
 * Build a `srcset` string from a list of widths and a URL factory.
 */
export function buildSrcset(widths: number[], url: (width: number) => string) {
  return widths.map(width => `${url(width)} ${width}w`).join(', ')
}
