import { LaampChannel } from '../../types'
import { publishEvent } from '../../events'

import { channelsStore } from '.'

export const insert = (channels: LaampChannel[]) => {
  channelsStore.push(...channels)
  channels.forEach((channel) => {
    publishEvent({ type: 'channelCreated', channel })
  })
  return true
}
