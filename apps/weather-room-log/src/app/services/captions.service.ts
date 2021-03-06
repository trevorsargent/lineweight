import { Injectable } from '@angular/core'
import { Duration } from 'luxon'
import { TrackId } from '../app.tracks'

import r from '../../assets/rebecca.captions.json'
import c from '../../assets/cristi.captions.json'
import { combineLatest, from, merge, Observable, Subject } from 'rxjs'
import {
  combineAll,
  distinctUntilChanged,
  share,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class CaptionService {
  private tracks: CaptionSet[] = [
    {
      id: TrackId.REBECCA,
      lines: processCaptions(r),
    },
    { id: TrackId.CRISTI, lines: processCaptions(c) },
  ]

  constructor() {}

  private activeTrackId = new Subject<TrackId>()
  private timeOffset = new Subject<number>()

  syncCaptions(trackId: TrackId, timeOffset: number) {
    this.activeTrackId.next(trackId)
    this.timeOffset.next(timeOffset)
  }

  getLinesObs() {
    return combineLatest([this.activeTrackId, this.timeOffset]).pipe(
      switchMap(([trackId, timeOffset]) => {
        return this.makeLinesObs(trackId, timeOffset)
      }),
    )
  }

  private makeLinesObs(trackId: TrackId, timeOffset: number) {
    const offset: Duration = Duration.fromObject({ seconds: timeOffset - 1 })

    const track = this.tracks.find((t) => t.id === trackId)

    if (!track) {
      return from([])
    }

    return new Observable<string>((subscriber) => {
      const nextLineIndex = track.lines.findIndex(
        (line) => line.timestamp.valueOf() > offset.valueOf(),
      )

      const indexToStart = nextLineIndex > 0 ? nextLineIndex - 1 : 0

      track.lines.slice(indexToStart).forEach((line) => {
        const milis = line.timestamp.minus(offset).as('milliseconds')
        setTimeout(
          () => {
            subscriber.next(line.text)
          },
          milis > 0 ? milis : 0,
        )
      })
    })
  }
}

const processCaptions = (data: CaptionFile): Line[] =>
  Object.entries(data).map(([timeString, text]) => ({
    text: text,
    timestamp: Duration.fromObject({
      hours: Number.parseInt(timeString.split(':')[0]),
      minutes: Number.parseInt(timeString.split(':')[1]),
      seconds: Number.parseInt(timeString.split(':')[2]),
    }),
  }))

interface CaptionSet {
  id: TrackId
  lines: Line[]
}

interface Line {
  timestamp: Duration
  text: string
}

interface CaptionFile {
  [time: string]: string
}
