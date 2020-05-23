import { Observable, Subject } from 'rxjs'
import type { ID, Color } from '@lineweight/types'
import type { LaampAdapter, LaampAdapterEvent } from './adapters/adapter.types'
import type { LaampDeviceEvent, LaampDevice } from './devices/device.types'
export interface LaampAdapterConfiguration {
  devices: LaampDevice[]
}

export interface Laamp {
  id: ID
  adapters: LaampAdapter
  devices: LaampDevice
}

export type LaampEvent = LaampAdapterEvent | LaampDeviceEvent

export type LaampAdapterStream = Observable<LaampAdapterEvent>

export type LaampAdapterSubject = Subject<LaampAdapterEvent>
