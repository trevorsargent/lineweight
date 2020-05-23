import { LaampAdapterSubject } from '../../../types'
import { Accessory, DeviceUpdatedCallback } from 'node-tradfri-client'
import { LaampLamp } from '../../../devices/device.types'

export const deviceUpdated = (
  deviceUpdated$: LaampAdapterSubject
): DeviceUpdatedCallback => (d: Accessory) => {
  const device: LaampLamp = {
    id: `${d.instanceId}`,
    color: d.lightList[0].color,
    intensity: d.lightList[0].dimmer,
  }
  deviceUpdated$.next({
    deviceUpdated: true,
    device,
  })
}
