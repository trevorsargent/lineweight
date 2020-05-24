import { LaampAdapterConfiguration, LaampEventSubject } from '../../../types'
import { LaampDeviceUpdatedEvent } from '../../adapter.types'
import { ID } from '@lineweight/types'
import { LaampDevice } from '../../../devices/device.types'

export const onDeviceUpdated = (
  adapter: LaampAdapterConfiguration,
  event: LaampDeviceUpdatedEvent
) => {
  const { device } = event

  const deviceMap = adapter.devices.reduce((m, dev) => {
    m.set(dev.id, dev)
    return m
  }, new Map<ID, LaampDevice>())

  deviceMap.set(device.id, device)

  return <LaampAdapterConfiguration>{
    ...adapter,
    devices: Array.from(deviceMap.values()),
  }
}
