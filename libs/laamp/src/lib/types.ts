export * from './devices/device.types'
export * from './adapters/adapter.types'

import { Observable, Subject } from 'rxjs'
import type { LaampGatewayEvent, LaampGateway } from './adapters/adapter.types'
import type { LaampDevice, LaampGroup } from './devices/device.types'
import { ID } from '@lineweight/types'

export interface LaampAdapterConfiguration {
  devices: LaampDevice[]
  groups: LaampGroup[]
}

export interface Laamp {
  gateways: LaampGateway[]
  channels: LaampChannel[]
}

export type LaampEvent = LaampGatewayEvent

export type LaampEventStream = Observable<LaampEvent>

export type LaampEventSubject = Subject<LaampEvent>

export interface LaampChannel {
  id: ID
  devices: LaampDevice[]
}
