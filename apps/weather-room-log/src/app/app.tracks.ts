import { TrackData } from './video-track/video-track.types'
export enum TrackId {
  REBECCA = 'Rebecca',
  CRISTI = 'Cristi',
  JACOB = 'Jacob',
}
export const tracks: TrackData[] = [
  {
    id: TrackId.REBECCA,
    src:
      'https://storage.googleapis.com/wr-down-by-the-river/20201126/REBECCA.mp4',
  },
  {
    id: TrackId.CRISTI,
    src:
      'https://storage.googleapis.com/wr-down-by-the-river/20201126/CRISTI.mp4',
  },
  {
    id: TrackId.JACOB,
    src:
      'https://storage.googleapis.com/wr-down-by-the-river/20201126/JACOB.mp4',
  },
]
