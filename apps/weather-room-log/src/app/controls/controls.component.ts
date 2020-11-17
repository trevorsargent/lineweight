import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'
import { NumberValueAccessor } from '@angular/forms'
import { TrackData, TrackCommand } from '../video-track/video-track.types'

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
})
export class ControlsComponent implements OnInit {
  constructor() {}

  @Input()
  tracks: TrackData[]

  @Input()
  loaded: boolean = false

  @Input()
  started: boolean = false

  @Output()
  activeTrack = new EventEmitter<string>()

  @Output()
  _start = new EventEmitter<void>()

  @Output()
  _fullscreen = new EventEmitter<void>()

  ngOnInit(): void {}

  select(trackId: string) {
    this.activeTrack.emit(trackId)
  }

  trackBy(_: number, track: TrackData) {
    return track.id
  }

  fullscreen() {
    this._fullscreen.emit()
  }

  start() {
    this._start.emit()
  }
}
