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

  tracks: TrackData[] = tracks

  commands = new Subject<TrackCommand>()

  tracksReady = new Map<string, boolean>()

  @ViewChild('surface', { static: true }) surface: ElementRef

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.syncAll()
    switch (event.key) {
      case '1':
        this.activateTrack(tracks[0].id)
        break
      case '2':
        this.activateTrack(tracks[1].id)
        break
      case '3':
        this.activateTrack(tracks[2].id)
        break
    }
  }

  ngOnInit(): void {
    tracks.forEach((t) => this.tracksReady.set(t.id, false))

    setInterval(this.syncAll, 100)
  }

  trackIsReady(trackId: string) {
    this.tracksReady.set(trackId, true)
    if (this.allTracksReady) {
      this.syncAll()
      this.start()
    }
  }

  get allTracksReady() {
    return Array.from(this.tracksReady.values()).every((v) => v)
  }

  start() {
    console.log('they are beautiful and strong and have a new media player')
    this.commands.next({ command: 'ACTIVATE', trackId: tracks[0].id })
    this.commands.next({ command: 'PLAY' })
  }

  syncAll() {
    const now = DateTime.local()
    const seconds = now.toSeconds()
    this.commands.next({ command: 'SYNC', time: seconds })
  }

  activateTrack(trackId: string) {
    this.commands.next({ command: 'ACTIVATE', trackId })
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
