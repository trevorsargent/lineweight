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

  names = new Map<string, string>()

  private stacked = new Set<string>()

  public TrackId = TrackId

  constructor(log: LogService, schedule: ScheduleService) {
    this.performances$ = log.performances$.pipe(
      map((set) => {
        return Object.entries(set).map(
          ([startTimeMilis, p]: [string, PerformanceData]): Performance => ({
            startTime: DateTime.fromMillis(Number.parseInt(startTimeMilis)),
            id: startTimeMilis,
            viewers: Object.entries(p).map(
              ([userId, v]): Viewer => ({
                id: userId,
                name: this.getAndCacheName(userId),
                actions: Object.entries(v)
                  .map(
                    ([_, data]): Omit<Action, 'width'> => ({
                      timestamp: DateTime.fromISO(data.timestamp).diff(
                        DateTime.fromMillis(Number.parseInt(startTimeMilis)),
                      ),
                      trackId: data.trackId,

                      held: (
                        DateTime.fromISO(
                          Object.entries(v)
                            .map(([_, action]) => action)
                            .sort((b, a) =>
                              DateTime.fromISO(b.timestamp)
                                .diff(DateTime.fromISO(a.timestamp))
                                .as('milliseconds'),
                            )
                            .find(
                              (a) =>
                                DateTime.fromISO(a.timestamp)
                                  .diff(DateTime.fromISO(data.timestamp))
                                  .as('milliseconds') > 0,
                            )?.timestamp,
                        ) ?? undefined
                      ).diff(DateTime.fromISO(data.timestamp)),
                    }),
                  )
                  .map((action) => ({
                    ...action,
                    width:
                      (action.held.as('milliseconds') /
                        schedule.PERFORMANCE_DURATION.as('milliseconds')) *
                        100 ?? undefined,
                  })),
              }),
            ),
          }),
        )
      }),
    )
  }

  getAndCacheName(id: string) {
    if (!this.names.has(id)) {
      faker.seed(hashCode(id))
      this.names.set(
        id,
        `${faker.name.firstName()} ${
          faker.random.boolean() ? faker.name.firstName() : ''
        } ${faker.name.lastName()}`,
      )
    }
    return this.names.get(id)
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

const hashCode = (s) =>
  s.split('').reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0)
