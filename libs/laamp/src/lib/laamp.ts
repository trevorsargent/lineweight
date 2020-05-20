import { ID } from '@lineweight/types'

export interface Laamp {
  id: ID
  adapter: LaampAdapter
}

export interface LaampAdapter {
  adapterType: LaampAdapterType
}

export enum LaampAdapterType {
  TRADFRI,
  HUE,
}
