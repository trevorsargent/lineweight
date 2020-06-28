import { LaampChannel } from '../../types'

const channelsStore: LaampChannel[] = []

export const channels = () => {
  return channelsStore
}
