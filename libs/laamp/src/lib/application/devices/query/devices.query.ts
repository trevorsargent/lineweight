import { ID } from '@lineweight/types'
import { LaampContext } from '../../../types'

export const devices = (ctx: LaampContext) => {
  return ctx.repo.devices()
}
