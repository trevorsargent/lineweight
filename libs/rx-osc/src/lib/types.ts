import { ID } from '@lineweight/types'

export interface OscEvent {
  id: ID
  address: string[]
  args: string[]
}

export interface ServerInfo {
  bindingAddress: string
  port: number
}
