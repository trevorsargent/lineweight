import { ID } from '@lineweight/types'
import { LaampContext } from '../../../types'

export const device = (id: ID, ctx: LaampContext) => {
  return ctx.repo.devices().find((d) => d.id === id)
}
