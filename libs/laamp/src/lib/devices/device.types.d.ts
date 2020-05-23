import { ID, Intensity } from '@lineweight/types'
import { LaampEvent } from '../types'

export type LaampDeviceSet = Set<ID>

export interface LaampDevice {
  id: ID
}

export interface LaampGroup {
  groupId: ID
  name: string
  deviceIds: ID[]
}

export interface LaampLamp extends LaampDevice {
  color: Color
  intensity: Intensity
}
