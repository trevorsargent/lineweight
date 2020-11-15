import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-video-track',
  templateUrl: './video-track.component.html',
  styleUrls: ['./video-track.component.scss'],
})
export class VideoTrackComponent implements OnInit {
  constructor() {}

  // @Input()
  videoSrc: string =
    'https://www.radiantmediaplayer.com/media/big-buck-bunny-360p.mp4'

  ngOnInit(): void {}
}
