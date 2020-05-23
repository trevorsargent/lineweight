import type { LaampDevice } from '../../devices/device.types'
import { ID } from '@lineweight/types'

export interface LaampAdapter {
  name: string
  id: ID
  address: string
}

export type LaampAdapterEvent =
  | LaampDeviceRemovedEvent
  | LaampDeviceUpdatedEvent
  | LaampGroupUpdatedEvent
  | LaampGroupRemovedEvent

export interface LaampDeviceUpdatedEvent {
  deviceUpdated: true
  device: LaampDevice
}

export interface LaampDeviceRemovedEvent {
  deviceRemoved: true
  deviceId: ID
}

export interface LaampGroupUpdatedEvent {
  groupUpdated: true
  groupId: ID
  deviceIds: ID[]
  name: string
}

export interface LaampGroupRemovedEvent {
  groupRemoved: true
  groupId: ID
}
export interface LaampErrorEvent {
  error: true
}
