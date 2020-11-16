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

  @Output()
  activeTrack = new EventEmitter<string>()

  @Output()
  fs = new EventEmitter<void>()

  ngOnInit(): void {}

  select(trackId: string) {
    this.activeTrack.emit(trackId)
  }

  trackBy(_: number, track: TrackData) {
    return track.id
  }

  fullscreen() {
    this.fs.emit()
  }
}
