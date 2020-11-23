import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'
import { NumberValueAccessor } from '@angular/forms'
import { StateService } from '../services/state.service'
import { TrackData, TrackCommand } from '../video-track/video-track.types'

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
})
export class ControlsComponent implements OnInit {
  constructor(public state: StateService) {}

  @Input()
  tracks: TrackData[]

  @Output()
  activeTrack = new EventEmitter<string>()

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
}
