import type { SMURF_QUERY_RESULT, SMURFS_QUERY_RESULT } from '~~/sanity.types'

export type SmurfListItem = SMURFS_QUERY_RESULT[number]
export type Smurf = NonNullable<SMURF_QUERY_RESULT>
export type SmurfImage = SmurfListItem['image']
