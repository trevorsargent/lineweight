import { LaampChannel } from '../../types'
import { publishEvent } from '../../events'

const channelsStore: LaampChannel[] = []

export const insert = (channels: LaampChannel[]) => {
  channelsStore.push(...channels)
  channels.forEach((channel) => {
    publishEvent({ type: 'channelCreated', channel })
  })
}
