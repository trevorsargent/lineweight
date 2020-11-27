import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { LogService, ViewGroup } from '../../services/log.service'
import { TrackId } from '../../app.tracks'

@Component({
  selector: 'app-flocks',
  templateUrl: './flocks.component.html',
  styleUrls: ['./flocks.component.scss'],
})
export class FlocksComponent implements OnInit {
  performances$: Observable<ViewGroup[]>

  private stacked = new Set<string>()

  public TrackId = TrackId

  constructor(public log: LogService) {
    this.performances$ = log.getPerformances$()
  }

  public detailViewerId: string = null

  get currentViewerId() {
    return this.log.getCurrentViewerId()
  }

  isStacked(id: string) {
    return this.stacked.has(id)
  }

  setStacked(id: string, stacked: boolean) {
    console.log(id)
    return stacked ? this.stacked.add(id) : this.stacked.delete(id)
  }

  showViewerDetail(id: string) {
    this.detailViewerId = id
  }

  ngOnInit(): void {}
}
