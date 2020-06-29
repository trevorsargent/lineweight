import { query } from './channels.query'
import { insert } from './channels.insert'
import { LaampChannel } from '@lineweight/laamp'

export const channelsStore: LaampChannel[] = []

export const channels = {
  query,
  insert,
}
