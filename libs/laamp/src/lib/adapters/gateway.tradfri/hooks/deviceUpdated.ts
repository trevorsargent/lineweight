import { LaampGatewayEventSubject } from '../../../types'
import {
  Accessory,
  DeviceUpdatedCallback,
  AccessoryTypes,
} from 'node-tradfri-client'
import {
  LaampLamp,
  LaampController,
  LaampBlind,
} from '../../../devices/device.types'

export const deviceUpdated = (
  events$: LaampGatewayEventSubject,
): DeviceUpdatedCallback => (d: Accessory) => {
  switch (d.type) {
    case AccessoryTypes.lightbulb:
      const devices: LaampLamp[] = d.lightList.map((light) => ({
        id: `Lamp:${d.instanceId}:${light.instanceId}`,
        color: light.color,
        intensity: light.onOff ? light.dimmer : 0,
        deviceType: 'lamp',
      }))

      devices.forEach((device) => {
        events$.next({
          type: 'deviceUpdated',
          device,
        })
      })
      break
    case AccessoryTypes.remote:
      const remote: LaampController = {
        deviceType: 'controller',
        id: `Remote:${d.instanceId}`,
      }

      events$.next({
        type: 'deviceUpdated',
        device: remote,
      })
      break
    case AccessoryTypes.blind:
      const blinds: LaampBlind[] = d.blindList.map((blind) => ({
        deviceType: 'blind',
        id: `Blind:${d.instanceId}`,
        position: blind.position,
      }))

      blinds.forEach((blind) => {
        events$.next({
          type: 'deviceUpdated',
          device: blind,
        })
      })

      break
  }
}
