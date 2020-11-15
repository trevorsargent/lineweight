import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import { tap } from 'rxjs/operators'
import { DateTime } from 'luxon'

@Component({
  selector: 'app-video-track',
  templateUrl: './video-track.component.html',
  styleUrls: ['./video-track.component.scss'],
})
export class VideoTrackComponent implements OnInit {
  constructor(private elementRef: ElementRef) {}

  @ViewChild('target', { static: true }) target: ElementRef
  @ViewChild('surface', { static: true }) surface: ElementRef

  @Input()
  videoSrc: string =
    'https://storage.googleapis.com/wr-down-by-the-river/171124_B1_HD_001.mp4'

  @Input()
  sound: boolean = false

  private _loaded: boolean = false

  @Output()
  loaded = new EventEmitter<void>()

  player: HTMLMediaElement

  ngOnInit(): void {
    this.initPlayer()

    this.loaded
      .pipe(
        tap((_) => {
          const now = DateTime.local()
          const seconds = now.toSeconds()

          this.setTime(seconds % this.duration)
          console.log(this.duration)
          this.play()
        }),
      )
      .subscribe()
  }

  initPlayer() {
    this.player = document.getElementById('target') as HTMLMediaElement

    this.player.oncanplaythrough = (ev) => {
      this.notifyLoaded()
    }

    // this.player.autoplay = true
    this.player.muted = true
    this.player.loop = true
  }

  setTime(time: number) {
    if (!this.player.duration) {
      throw Error('Cannot seek, player not loaded')
    }

    if (time < 1 || time > this.player.duration) {
      throw new Error('Cannot seek beyond the range of the video')
    }

    this.player.currentTime = time
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
