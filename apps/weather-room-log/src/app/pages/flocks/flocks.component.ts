import { PerfRecorder } from '@angular/compiler-cli/src/ngtsc/perf'
import { Component, OnInit } from '@angular/core'
import { DateTime, Duration } from 'luxon'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import {
  Action,
  LogService,
  PerformanceData,
  Viewer,
  Performance,
} from '../../services/log.service'
import faker from 'faker'
import { TrackId } from '../../app.tracks'
import { ScheduleService } from '../../services/schedule.service'

@Component({
  selector: 'app-flocks',
  templateUrl: './flocks.component.html',
  styleUrls: ['./flocks.component.scss'],
})
export class FlocksComponent implements OnInit {
  performances$: Observable<Performance[]>

  private stacked = new Set<string>()

  public TrackId = TrackId

  constructor(log: LogService) {
    this.performances$ = log.getPerformances$()
  }

  isStacked(id: string) {
    return this.stacked.has(id)
  }

  setStacked(id: string, stacked: boolean) {
    console.log(id)
    return stacked ? this.stacked.add(id) : this.stacked.delete(id)
  }

  getViewersHeight(perf: Performance) {
    return this.isStacked(perf.id) ? 8 : perf.viewers.length * 4
  }

  getTopOffset(performanceId: string, index: number) {
    return this.isStacked(performanceId) ? 0 : index * 4
  }

  ngOnInit(): void {}
}
