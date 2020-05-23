import type { LaampDevice } from '../devices/device.types'
import { ID } from '@lineweight/types'

export interface LaampAdapter {
  name: string
  id: ID
  address: string
}

export type LaampAdapterEvent =
  | LaampConnectionAliveEvent
  | LaampConnectionFailedEvent
  | LaampConnectionLostEvent
  | LaampDeviceRemovedEvent
  | LaampDeviceUpdatedEvent

export interface LaampDeviceUpdatedEvent {
  deviceUpdated: true
  device: LaampDevice
}

export interface LaampDeviceRemovedEvent {
  deviceRemoved: true
  deviceId: ID
}

export interface LaampConnectionAliveEvent {
  connectionAlive: true
}

export interface LaampConnectionFailedEvent {
  connectionFailed: true
}

export interface LaampConnectionLostEvent {
  connectionLost: true
}

export interface LaampErrorEvent {
  error: true
}
