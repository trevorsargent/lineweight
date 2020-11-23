import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core'
import { DateTime } from 'luxon'
import { interval, Subject } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { tracks } from '../app.tracks'
import { ScheduleService } from '../services/schedule.service'
import { StateService } from '../services/state.service'
import { TrackCommand, TrackData } from '../video-track/video-track.types'

@Component({
  selector: 'app-surface',
  templateUrl: './surface.component.html',
  styleUrls: ['./surface.component.scss'],
})
export class SurfaceComponent implements OnInit {
  constructor(public state: StateService, public schedule: ScheduleService) {}

  timeToNextShow = interval(100).pipe(
    map((_) => this.schedule.getNextEvent().diffNow().toFormat('hh:mm:ss')),
  )

  tracks: TrackData[] = tracks

  commands = new Subject<TrackCommand>()

  tracksReady = new Map<string, boolean>()

  activeTrackId: string = null

  @ViewChild('surface', { static: true }) surface: ElementRef

  ngOnInit(): void {
    tracks.forEach((t) => this.tracksReady.set(t.id, false))
  }

  trackIsReady(trackId: string) {
    this.tracksReady.set(trackId, true)
    if (Array.from(this.tracksReady.values()).every((v) => v)) {
      this.state.notifyLoaded()
      this.state.registerStartHook(this.activate.bind(this))
    }
  }

  activate() {
    this.state.notifyActive()
    const active = Math.floor(Math.random() * tracks.length)
    this.publishEvent({ command: 'PLAY' })
    this.syncAll()
    this.activateTrack(tracks[active].id)
  }

  syncAll() {
    const currentTime = this.schedule.getCurrentEventTimeCode()
    this.publishEvent({ command: 'SYNC', time: currentTime ?? 0 })
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
