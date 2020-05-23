import { ID } from '@lineweight/types'
import { LaampEvent } from '../types'

export type LaampDeviceSet = Set<ID>

export interface LaampDevice {
  id: ID
}

export interface LaampDeviceEvent extends LaampEvent {
  device: LaampDevice
}
