import { ID, Intensity, Color } from '@lineweight/types'

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
