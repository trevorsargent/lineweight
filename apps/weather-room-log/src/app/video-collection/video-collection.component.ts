import { Component, OnInit } from '@angular/core'
import { TrackData } from '../video-track/video-track.types'

@Component({
  selector: 'app-video-collection',
  templateUrl: './video-collection.component.html',
  styleUrls: ['./video-collection.component.scss'],
})
export class VideoCollectionComponent implements OnInit {
  constructor() {}

  public currentTrack = null

  get currentVideo() {
    return this.videos.find((v) => v.id === this.currentTrack)
  }

  setCurrent(id: string) {
    this.currentTrack = id
  }

  videos: TrackData[] = [
    {
      id: 'Taylor',
      src:
        'https://storage.googleapis.com/wr-youth-predictions/Dear%202020%20-%20Taylor%20Putzek%20PETE%20Project.mp4',
    },
    {
      id: 'Elijah',
      src:
        'https://storage.googleapis.com/wr-youth-predictions/PETE%20Climate%20Change%20Project%20Elijah%20Castillo.mp4',
    },
    {
      id: 'Jamie',
      src:
        'https://storage.googleapis.com/wr-youth-predictions/Weather%20Room%20(Jamie%20Mack).mp4',
    },
  ]

  ngOnInit(): void {
    this.currentTrack = this.videos[0].id
  }
}
