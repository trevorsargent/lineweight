import { channels } from './channels'
import { devices } from './devices'
import { ID } from '@lineweight/types'
import { LaampDevice } from '../devices/device.types'
import { LaampChannel } from '../types'

export const repo: LaampRepo = {
  devices,
  channels,
}

export interface LaampRepo {
  devices: LaampRepoCollection<LaampDevice>
  channels: LaampRepoCollection<LaampChannel>
}

export interface LaampRepoCollection<T> {
  query: (id: ID[]) => T[]
  insert?: (t: T[]) => boolean
  update?: (t: T[]) => boolean
  delete?: (t: T[]) => boolean
}
