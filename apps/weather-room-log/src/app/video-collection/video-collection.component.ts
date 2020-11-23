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
      id: 'Amelia',
      src:
        'https://storage.googleapis.com/wr-youth-predictions/Amelia%20Dusevoir.mov',
    },
    {
      id: 'Arjun',
      src:
        'https://storage.googleapis.com/wr-youth-predictions/Arjun%20Pai.mp4',
    },
    {
      id: 'Della',
      src:
        'https://storage.googleapis.com/wr-youth-predictions/Della%20Cosloy.mp4',
    },
    {
      id: 'Elijah',
      src:
        'https://storage.googleapis.com/wr-youth-predictions/Elijah%20Castillo.mp4',
    },
    {
      id: 'Jamie',
      src:
        'https://storage.googleapis.com/wr-youth-predictions/Jamie%20Mack.mp4',
    },
    {
      id: 'Taylor',
      src:
        'https://storage.googleapis.com/wr-youth-predictions/Taylor%20Putzek.mp4',
    },
  ]

  ngOnInit(): void {
    this.currentTrack = this.videos[0].id
  }
}
