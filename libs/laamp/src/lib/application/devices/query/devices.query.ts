import { LaampContext } from '../../../types'

export const devices = (ctx: LaampContext) => {
  return ctx.repo.devices.query([])
}
