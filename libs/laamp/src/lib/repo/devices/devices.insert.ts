import { LaampDevice } from '../../devices/device.types'
import { deviceStore } from '.'
import { publishEvent } from '../../events'

export const insert = (devices: LaampDevice[]) => {
  deviceStore.push(...devices)
  devices.forEach((device) => {
    publishEvent({ type: 'deviceCreated', device })
  })
  return true
}
