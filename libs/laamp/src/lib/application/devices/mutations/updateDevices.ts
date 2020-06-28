import { LaampDevice, LaampController } from '../../../devices/device.types'
import { LaampContext } from '../../../types'

export const updateDevices = (devices: LaampDevice[], ctx: LaampContext) => {
  ctx.repo.devices.update(devices)
}
