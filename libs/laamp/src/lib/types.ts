import { Observable, Subject } from 'rxjs'
import type { ID, Color } from '@lineweight/types'
import type {
  LaampGatewayInfo,
  LaampGatewayEvent,
} from './adapters/adapter/adapter.types'
import type { LaampDevice, LaampGroup } from './devices/device.types'
export interface LaampAdapterConfiguration {
  devices: LaampDevice[]
  groups: LaampGroup[]
}

export interface Laamp {
  id: ID
  devices: LaampDevice
  channels: LaampChannel
  gateways: LaampGatewayInfo[]
}

export type LaampEvent = LaampGatewayEvent

export type LaampEventStream = Observable<LaampEvent>

export type LaampEventSubject = Subject<LaampEvent>

export interface LaampChannel {
  devices: LaampDevice
}
