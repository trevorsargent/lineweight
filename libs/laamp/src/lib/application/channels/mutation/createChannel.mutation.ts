import { LaampChannel, LaampContext } from '../../../types'

export const createChannel = (channel: LaampChannel, ctx: LaampContext) => {
  ctx.repo.channels.insert([channel])
}
