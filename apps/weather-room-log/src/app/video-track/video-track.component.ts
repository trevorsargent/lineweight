import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import { takeUntil, tap } from 'rxjs/operators'
import { DateTime } from 'luxon'
import { TrackCommand, TrackData } from './video-track.types'
import { Observable, Subject } from 'rxjs'

@Component({
  selector: 'app-video-track',
  templateUrl: './video-track.component.html',
  styleUrls: ['./video-track.component.scss'],
})
export class VideoTrackComponent implements OnInit, OnDestroy, TrackData {
  constructor(private elementRef: ElementRef) {}

  @ViewChild('target', { static: true }) target: ElementRef

  @Input()
  src: string

  @Input()
  id: string

  @Input()
  commands: Observable<TrackCommand>

  private unsub$ = new Subject<void>()

  @Input()
  sound: boolean = false

  private _loaded: boolean = false

  @Output()
  loaded = new EventEmitter<void>()

  player: HTMLMediaElement

  isActiveTrack: boolean = false

  ngOnInit(): void {
    this.initPlayer()

    this.commands.pipe(takeUntil(this.unsub$)).subscribe((cmd) => {
      switch (cmd.command) {
        case 'PLAY':
          this.play()
          break
        case 'SYNC':
          this.sync(cmd.time)
          break
        case 'ACTIVATE':
          this.setIsActiveTrack(cmd.trackId)
      }
    })
  }

  ngOnDestroy() {
    this.unsub$.next()
    this.unsub$.complete()
  }

  initPlayer() {
    this.player = this.target.nativeElement

    this.player.oncanplaythrough = (ev) => {
      this.notifyLoaded()
    }

    // this.player.autoplay = true
    this.player.muted = true
    this.player.loop = true
  }

  setIsActiveTrack(activeTrackId: string) {
    this.isActiveTrack = activeTrackId === this.id
  }

  get opacity() {
    return this.isActiveTrack ? 1 : 0
  }

  sync(time: number) {
    if (!this.player.duration) {
      throw Error('Cannot seek, player not loaded')
    }

    this.player.currentTime = time % this.duration
  }

  play() {
    this.player.play()
  }

  get duration() {
    return this.player.duration
  }

  private notifyLoaded() {
    if (!this._loaded) {
      this.loaded.emit()
    }
    this._loaded = true
  }
}
