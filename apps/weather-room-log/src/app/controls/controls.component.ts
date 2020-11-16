import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'
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
  commands = new EventEmitter<TrackCommand>()

  @Output()
  fs = new EventEmitter<void>()

  ngOnInit(): void {}

  select(trackId: string) {
    this.commands.emit({command: 'ACTIVATE', trackId})
  }

  fullscreen(){
    this.fs.emit()
  }
}
