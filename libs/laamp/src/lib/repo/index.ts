import { Laamp } from '@lineweight/laamp'

import { channels } from './channels'
import { devices } from './devices'
import { LaampContext } from '../types'

export const repo: LaampRepo = {
  devices,
  channels,
}

export interface LaampRepo {
  [key: string]: LaampRepoCollection<any>
}

export interface LaampRepoCollection<T> {
  query: () => T[]
  insert?: (t: T[]) => boolean
  update?: (t: T[]) => boolean
  delete?: (t: T[]) => boolean
}
