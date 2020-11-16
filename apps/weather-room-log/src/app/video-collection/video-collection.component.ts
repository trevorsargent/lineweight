import { Component, OnInit } from '@angular/core'
import { TrackData } from '../video-track/video-track.types'

@Component({
  selector: 'app-video-collection',
  templateUrl: './video-collection.component.html',
  styleUrls: ['./video-collection.component.scss'],
})
export class VideoCollectionComponent implements OnInit {
  constructor() {}

  videos: TrackData[] = [
    {
      id: 'taylor',
      src:
        'https://storage.googleapis.com/wr-youth-predictions/Dear%202020%20-%20Taylor%20Putzek%20PETE%20Project.mp4',
    },
    {
      id: 'elijah',
      src:
        'https://storage.googleapis.com/wr-youth-predictions/PETE%20Climate%20Change%20Project%20Elijah%20Castillo.mp4',
    },
    {
      id: 'jamie',
      src:
        'https://storage.googleapis.com/wr-youth-predictions/Weather%20Room%20(Jamie%20Mack).mp4',
    },
  ]

  ngOnInit(): void {}
}
