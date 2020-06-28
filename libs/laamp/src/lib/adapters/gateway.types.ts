import type { LaampDevice, LaampGroup } from '../devices/device.types'
import { ID } from '@lineweight/types'

export interface LaampGateway {
  id: ID
  info: LaampGatewayInfo
  devices: LaampDevice[]
  // events: Observable<LaampGatewayEvent>
}

export interface LaampGatewayInfo {
  name: string
  id: ID
  address: string
}

export type LaampGatewayEvent =
  | {
      type: 'deviceUpdated'
      device: LaampDevice
    }
  | {
      type: 'deviceRemoved'
      deviceId: ID
    }
  | {
      type: 'groupUpdated'
      group: LaampGroup
    }
  | {
      type: 'groupRemoved'
      groupId: ID
    }
  | {
      type: 'error'
      error: any
    }
