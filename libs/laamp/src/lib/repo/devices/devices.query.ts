import { deviceStore } from './index'
import { ID } from '@lineweight/types'

export const query = (ids: ID[]) => {
  if (ids.length) {
    return deviceStore.filter((d) => ids.includes(d.id))
  }
  return deviceStore
}
