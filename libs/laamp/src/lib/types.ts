export * from './devices/device.types'
export * from './adapters/adapter.types'

import { Observable, Subject } from 'rxjs'
import type { LaampGatewayEvent, LaampGateway } from './adapters/adapter.types'
import type { LaampDevice, LaampGroup } from './devices/device.types'

export interface LaampAdapterConfiguration {
  devices: LaampDevice[]
  groups: LaampGroup[]
}

export interface Laamp {
  devices: LaampDevice[]
  channels: LaampChannel[]
  gateways: LaampGateway[]
}

export type LaampEvent = LaampGatewayEvent

export type LaampEventStream = Observable<LaampEvent>

export type LaampEventSubject = Subject<LaampEvent>

export interface LaampChannel {
  devices: LaampDevice
}
