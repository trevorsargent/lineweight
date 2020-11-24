import { PerfRecorder } from '@angular/compiler-cli/src/ngtsc/perf'
import { Component, OnInit } from '@angular/core'
import { DateTime, Duration } from 'luxon'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { LogService } from '../../services/log.service'

@Component({
  selector: 'app-flocks',
  templateUrl: './flocks.component.html',
  styleUrls: ['./flocks.component.scss'],
})
export class FlocksComponent implements OnInit {
  performances$: Observable<Performance[]>

  constructor(log: LogService) {
    log.performances$
      .pipe(
        map((set) => {
          return Object.entries(set).map(([startTimeMilis, p]) => ({
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
                  })),
                },
            ),
          }))
        }),
      )
      .subscribe((x) => console.log(x))
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
}
