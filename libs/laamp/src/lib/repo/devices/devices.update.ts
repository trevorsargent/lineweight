import { LaampDevice } from '../../devices/device.types'
import { deviceStore } from '.'
import { publishEvent } from '../../events'

export const update = (devices: LaampDevice[]) => {
  devices.forEach((device) => {
    const idx = deviceStore.findIndex((d) => d.id === device.id)

    deviceStore[idx] = {
      ...deviceStore[idx],
      ...device,
    }
  })

  devices.forEach((device) => {
    publishEvent({ type: 'deviceUpdated', device })
  })
  return true
}
