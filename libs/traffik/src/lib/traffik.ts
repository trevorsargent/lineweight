import { ID } from '@lineweight/types'

export interface TraffikCommand {
  id: ID
  type: TraffikCommandType
}

export enum TraffikCommandType {
  SCENE,
  ALERT,
  OVERRIDE,
}
