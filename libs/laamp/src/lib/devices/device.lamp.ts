import { Observable, Subject } from 'rxjs'
import { LaampDeviceEvent, LaampDevice } from './device.types'
import { Color } from '@lineweight/types'

export interface LaampLamp extends LaampDevice {
  color: Color
}
