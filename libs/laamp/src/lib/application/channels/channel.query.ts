import { repo } from '../../repo'

export const channel = (id) => {
  return repo.channels().find((ch) => ch.id === id)
}
