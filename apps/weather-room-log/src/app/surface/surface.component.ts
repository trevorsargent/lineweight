import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core'
import { DateTime } from 'luxon'
import { Subject } from 'rxjs'
import { tracks } from '../app.tracks'
import { TrackCommand, TrackData } from '../video-track/video-track.types'

@Component({
  selector: 'app-surface',
  templateUrl: './surface.component.html',
  styleUrls: ['./surface.component.scss'],
})
export class SurfaceComponent implements OnInit {
  constructor() {}

  started: boolean = false

  tracks: TrackData[] = tracks

  commands = new Subject<TrackCommand>()

  tracksReady = new Map<string, boolean>()

  get allTracksReady() {
    return Array.from(this.tracksReady.values()).every((v) => v)
  }

  activeTrackId: string = null

  @ViewChild('surface', { static: true }) surface: ElementRef

  ngOnInit(): void {
    tracks.forEach((t) => this.tracksReady.set(t.id, false))
  }

  trackIsReady(trackId: string) {
    this.tracksReady.set(trackId, true)
    if (this.allTracksReady) {
      this.syncAll()
    }
  }

  start() {
    this.started = true
    this.publishEvent({ command: 'PLAY' })
    this.activateTrack(tracks[0].id)
  }

  syncAll() {
    const now = DateTime.local()
    const seconds = now.toSeconds()
    console.log(seconds)
    this.publishEvent({ command: 'SYNC', time: seconds })
  }

  activateTrack(trackId: string) {
    this.activeTrackId = trackId
  }

  private publishEvent(command: TrackCommand) {
    this.commands.next(command)
  }

  trackBy(_: number, track: TrackData) {
    return track.id
  }

  openFullscreen() {
    // Use this.divRef.nativeElement here to request fullscreen
    const elem = this.surface.nativeElement

    if (elem.requestFullscreen) {
      elem.requestFullscreen()
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen()
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen()
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen()
    }
  }
}
