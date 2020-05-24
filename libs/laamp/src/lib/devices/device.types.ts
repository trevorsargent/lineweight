import { ID, Intensity, Color } from '@lineweight/types'

export type LaampDeviceSet = Set<ID>

export type LaampDevice = LaampLamp

export interface LaampGroup {
  groupId: ID
  name: string
  deviceIds: ID[]
}

export interface LaampLamp {
  lamp: true
  id: ID
  color: Color
  intensity: Intensity
}
