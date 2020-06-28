import { LaampDevice, LaampController } from '../../../devices/device.types'
import { LaampContext } from '../../../types'

export const createDevices = (devices: LaampDevice[], ctx: LaampContext) => {
  ctx.repo.devices.insert(devices)
}
