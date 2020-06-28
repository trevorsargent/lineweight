import { LaampContext } from '../../../types'

export const channels = (ctx: LaampContext) => {
  return ctx.repo.channels.query([])
}
