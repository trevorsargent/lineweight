export interface TrackData {
  id: string
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
