import { Observable, Subject } from 'rxjs'
import type { ID, Color } from '@lineweight/types'
import type {
  LaampAdapter,
  LaampAdapterEvent,
} from './adapters/adapter/adapter.types'
import type { LaampDevice, LaampGroup } from './devices/device.types'
export interface LaampAdapterConfiguration {
  devices: LaampDevice[]
  groups: LaampGroup[]
}

export interface Laamp {
  id: ID
  adapters: LaampAdapter
  devices: LaampDevice
}

export type LaampEvent = LaampAdapterEvent

export type LaampAdapterStream = Observable<LaampAdapterEvent>

export type LaampAdapterSubject = Subject<LaampAdapterEvent>
