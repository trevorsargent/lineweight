import { LaampContext } from '../../../types'

export const channel = (id, ctx: LaampContext) => {
  return ctx.repo.channels.query([id])
}
