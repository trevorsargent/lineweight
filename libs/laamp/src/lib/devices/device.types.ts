import { ID, Intensity, Color } from '@lineweight/types'

export type LaampDeviceSet = Set<ID>

export type LaampDevice = LaampLamp | LaampController | LaampBlind

export interface LaampGroup {
  id: ID
  name: string
  deviceIds: ID[]
}

export interface LaampLamp {
  deviceType: 'lamp'
  id: ID
  color: Color
  intensity: Intensity
}

export interface LaampController {
  deviceType: 'controller'
  id: ID
}

export interface LaampBlind {
  deviceType: 'blind'
  id: ID
  position: number
}
