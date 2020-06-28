import { ID } from '@lineweight/types'
import { LaampContext } from '../../../types'
import { LaampDevice } from '../../../devices/device.types'

export const device = (id: ID, ctx: LaampContext): LaampDevice => {
  return ctx.repo.devices.query([id])[0]
}
