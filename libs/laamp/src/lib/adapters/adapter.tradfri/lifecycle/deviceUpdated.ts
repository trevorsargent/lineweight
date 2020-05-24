import { LaampEventSubject } from '../../../types'
import { Accessory, DeviceUpdatedCallback } from 'node-tradfri-client'
import { LaampLamp } from '../../../devices/device.types'

export const deviceUpdated = (
  deviceUpdated$: LaampEventSubject
): DeviceUpdatedCallback => (d: Accessory) => {
  const device: LaampLamp = {
    id: `${d.instanceId}`,
    lamp: true,
    color: d.lightList[0].color,
    intensity: d.lightList[0].onOff ? d.lightList[0].dimmer : 0,
  }
  deviceUpdated$.next({
    deviceUpdated: true,
    device,
  })
}
