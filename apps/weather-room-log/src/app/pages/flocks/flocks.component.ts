import { PerfRecorder } from '@angular/compiler-cli/src/ngtsc/perf'
import { Component, OnInit } from '@angular/core'
import { DateTime, Duration } from 'luxon'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { LogService, PerformanceData } from '../../services/log.service'

@Component({
  selector: 'app-flocks',
  templateUrl: './flocks.component.html',
  styleUrls: ['./flocks.component.scss'],
})
export class FlocksComponent implements OnInit {
  performances$: Observable<Performance[]>

  constructor(log: LogService) {
    this.performances$ = log.performances$.pipe(
      map((set) => {
        return Object.entries(set).map(
          ([startTimeMilis, p]: [string, PerformanceData]) => ({
            startTime: DateTime.fromMillis(Number.parseInt(startTimeMilis)),
            viewers: Object.entries(p).map(
              ([userId, v]) =>
                <Viewer>{
                  id: userId,
                  actions: Object.entries(v).map(([_, data]) => ({
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
                  })),
                },
            ),
          }),
        )
      }),
      tap((x) => console.log(x)),
    )
  }

  ngOnInit(): void {}
}

interface Performance {
  startTime: DateTime
  viewers: Viewer[]
}

interface Viewer {
  id: string
  actions: Action[]
}

interface Action {
  timestamp: Duration
  trackId: string
  held: Duration
}
