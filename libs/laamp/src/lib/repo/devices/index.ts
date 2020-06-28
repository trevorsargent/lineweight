import { LaampDevice } from '../../types'
import { query } from './devices.query'
import { insert } from './devices.insert'
import { update } from './devices.update'
import { LaampRepoCollection } from '..'

export const deviceStore: LaampDevice[] = []

export const devices: LaampRepoCollection<LaampDevice> = {
  query,
  insert,
  update,
}
