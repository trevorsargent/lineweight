import { TrackId } from '../app.tracks'

export interface TrackData {
  id: TrackId
  src: string
}

export type TrackCommand =
  | {
      command: 'PLAY'
    }
  | {
      command: 'SYNC'
      time: number
    }
  | { command: 'ACTIVATE'; trackId: string }
