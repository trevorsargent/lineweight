import { LaampContext } from '../../../types'

export const channels = (ctx: LaampContext) => {
  const a = ctx.repo.channels.query([])
  return a
}
