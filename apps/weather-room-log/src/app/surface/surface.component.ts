import { trigger, transition, style, animate } from '@angular/animations'
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core'
import { interval, Observable, Subject } from 'rxjs'
import { map } from 'rxjs/operators'
import { TrackId, tracks } from '../app.tracks'
import { CaptionService } from '../services/captions.service'
import { LogService } from '../services/log.service'
import { ScheduleService } from '../services/schedule.service'
import { StateService } from '../services/state.service'
import { TrackCommand, TrackData } from '../video-track/video-track.types'

@Component({
  selector: 'app-surface',
  templateUrl: './surface.component.html',
  styleUrls: ['./surface.component.scss'],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1000ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('1000ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class SurfaceComponent implements OnInit {
  constructor(
    public state: StateService,
    private schedule: ScheduleService,
    private log: LogService,
    private captions: CaptionService,
    private element: ElementRef,
  ) {}

  timeToNextShow = interval(100).pipe(
    map((_) => this.schedule.getNextEvent()?.diffNow().toFormat('hh:mm:ss')),
  )

  captions$: Observable<string>

  isFullscreen: boolean = false

  isCaptionsOn: boolean = false

  tracks: TrackData[] = tracks

  commands = new Subject<TrackCommand>()

  tracksReady = new Map<string, boolean>()

  activeTrackId: TrackId = null

  public postShow: boolean = false

  @ViewChild('surface', { static: true }) surface: ElementRef

  @ViewChild('audio', { static: true }) audio: ElementRef

  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload(_) {
    this.log.logAction(null)
  }

  ngOnInit(): void {
    tracks.forEach((t) => this.tracksReady.set(t.id, false))
  }

  trackIsReady(trackId: string) {
    this.tracksReady.set(trackId, true)
    if (Array.from(this.tracksReady.values()).every((v) => v)) {
      this.state.notifyLoaded()
      this.state.registerActivateHook(this.activate.bind(this))
      this.state.registerPostShowHook(this.showPostShow.bind(this))
      this.state.registerResetHook(this.reset.bind(this))
    }
  }

  activate() {
    this.state.notifyActive()
    const active = Math.floor(Math.random() * tracks.length)
    this.publishEvent({ command: 'PLAY' })
    this.syncAll()
    setTimeout(() => {
      this.activateTrack(tracks[active].id)
      this.captions$ = this.captions.getLinesObs()
      this.refreshCaptions()
      setInterval(() => this.refreshCaptions(), 1000)
    }, 0)
  }

  syncAll() {
    const currentTime = this.schedule.getCurrentEventTimeCode()
    this.publishEvent({ command: 'SYNC', time: currentTime ?? 0 })
  }

  activateTrack(trackId: TrackId) {
    this.log.logAction(trackId)
    this.activeTrackId = trackId
    this.refreshCaptions()
  }

  refreshCaptions() {
    this.captions.syncCaptions(
      this.activeTrackId,
      this.schedule.getCurrentEventTimeCode(),
    )
  }

  private publishEvent(command: TrackCommand) {
    this.commands.next(command)
  }

  trackBy(_: number, track: TrackData) {
    return track.id
  }

  showPostShow() {
    this.postShow = true
  }

  reset() {
    this.activateTrack(null)
    this.postShow = false
  }

  start() {
    this.state.notifyStarted()
    this.audio.nativeElement.play()
  }

  handleFullscreen() {
    if (this.isFullscreen) {
      this.closeFullscreen()
      this.isFullscreen = false
    } else {
      this.openFullscreen()
      this.isFullscreen = true
    }
  }

  handleCaptions() {
    if (this.isCaptionsOn) {
      this.isCaptionsOn = false
    } else {
      this.isCaptionsOn = true
      this.refreshCaptions()
    }
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

  closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if ((document as any).webkitExitFullscreen) {
      /* Safari */
      ;(document as any).webkitExitFullscreen()
    } else if ((document as any).msExitFullscreen) {
      /* IE11 */
      ;(document as any).msExitFullscreen()
    }
  }
}
