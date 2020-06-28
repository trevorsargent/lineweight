import { repo } from '../../repo'
import { ID } from '@lineweight/types'

export const devices = () => {
  return repo.devices()
}

export const device = (id: ID) => {
  return repo.devices().find((d) => d.id === id)
}
