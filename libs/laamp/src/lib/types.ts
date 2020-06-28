export * from './devices/device.types'
export * from './adapters/gateway.types'

import { Observable, Subject } from 'rxjs'
import type { LaampGatewayEvent, LaampGateway } from './adapters/gateway.types'
import type { LaampDevice, LaampGroup } from './devices/device.types'
import { ID } from '@lineweight/types'

export interface LaampGatewayConfiguration {
  devices: LaampDevice[]
  groups: LaampGroup[]
}

export interface Laamp {
  gateways: LaampGateway[]
  channels: LaampChannel[]
  devices: LaampDevice[]
  sendCommand: (command: LaampCommand) => boolean
}

export type LaampGatewayEventStream = Observable<LaampGatewayEvent>
export type LaampGatewayEventSubject = Subject<LaampGatewayEvent>

export interface LaampChannel {
  id: ID
  devices: LaampDevice[]
}

export type LaampCommand = LaampSetChannelCommand

export interface LaampSetChannelCommand {
  setChannel: true
  channel: LaampChannel
}

export type LaampEvent =
  | {
      type: 'deviceCreated'
      device: LaampDevice
    }
  | {
      type: 'deviceUpdated'
      device: LaampDevice
    }
  | {
      type: 'deviceRemoved'
      device: LaampDevice
    }
  | {
      type: 'channelDeleted'
      channel: LaampChannel
    }
  | {
      type: 'channelUpdated'
      channel: LaampChannel
    }
  | {
      type: 'channelDeleted'
      channel: LaampChannel
    }
