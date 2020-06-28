import { LaampChannel } from '../../types'

const channelsStore: LaampChannel[] = []

export const query = () => {
  return channelsStore
}
