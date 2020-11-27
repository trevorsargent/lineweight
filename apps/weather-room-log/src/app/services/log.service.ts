import { Injectable } from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/database'

import { DateTime, Duration } from 'luxon'
import { Observable, ReplaySubject, Subject } from 'rxjs'
import { map } from 'rxjs/operators'

import * as uuid from 'uuid'
import { ScheduleService } from './schedule.service'

import { name, seed, random } from 'faker'

@Injectable({ providedIn: 'root' })
export class LogService {
  public data$ = new ReplaySubject<PerformanceSet>()
  private userId: string

  names = new Map<string, string>()

  viewerDetailId = new Subject<string>()

  private readonly COLLECTION = 'dev'

  constructor(
    private firestore: AngularFireDatabase,
    private schedule: ScheduleService,
  ) {
    const WR_TOKEN = 'wr-log-id'

    this.userId = localStorage.getItem(WR_TOKEN) ?? uuid.v4()
    localStorage.setItem(WR_TOKEN, this.userId)

    this.firestore.database
      .ref(this.COLLECTION)
      .on('value', (snap) => this.data$.next(snap.val()))
  }

  getPerformances$(): Observable<ViewGroup[]> {
    return this.data$.pipe(
      map(this.processPerformanceData),
      map((perfs) =>
        perfs.map(
          (perf): ViewGroup => ({
            name: perf.startTime.toLocaleString(DateTime.DATETIME_FULL),

            views: perf.viewers.map((viewer) => ({
              actions: viewer.actions,
              label: { id: viewer.id, text: this.getAndCacheName(viewer.id) },
            })),
          }),
        ),
      ),
    )
  }

  getViews$(viewerId: string): Observable<ViewGroup> {
    return this.data$.pipe(
      map(this.processPerformanceData),
      map((perfs) => ({
        name: this.getAndCacheName(viewerId),
        views: perfs
          .filter((perf) => perf.viewers.find((v) => v.id === viewerId))
          .map((performance) => ({
            id: performance.id,
            label: {
              id: performance.startTime.toMillis().toString(),
              text: performance.startTime.toLocaleString(DateTime.DATETIME_MED),
            },
            actions: performance.viewers.find((v) => v.id === viewerId).actions,
          })),
      })),
    )
  }

  getCurrentViewerId() {
    return this.userId
  }

  logAction(trackId: string) {
    const action: ActionLog = {
      trackId,
      timestamp: DateTime.local(),
    }

    if (!this.schedule.getCurrentEvent()) {
      return
    }

    this.firestore.database
      .ref(
        `${this.COLLECTION}/${this.schedule.getCurrentEvent().toMillis()}/${
          this.userId
        }`,
      )
      .push(actionToData(action))
      .catch(console.error)
  }

  private getAndCacheName(id: string) {
    if (!this.names.has(id)) {
      seed(hashCode(id))
      this.names.set(
        id,
        `${name.firstName()} ${
          random.boolean() ? name.firstName() : ''
        } ${name.lastName()}`,
      )
    }
    return this.names.get(id)
  }

  processPerformanceData = (ps: PerformanceSet): Performance[] => {
    return Object.entries(ps).map(
      ([startTimeMilis, p]: [string, PerformanceData]): Performance => ({
        id: startTimeMilis,
        startTime: DateTime.fromMillis(Number.parseInt(startTimeMilis)),

        viewers: Object.entries(p).map(
          ([userId, v]): Viewer => ({
            id: userId,
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
                    this.schedule.PERFORMANCE_DURATION.as('milliseconds')) *
                    100 ?? undefined,
              })),
          }),
        ),
      }),
    )
  }
}

const hashCode = (s) =>
  s.split('').reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0)

const actionToData = ({ timestamp, trackId }: ActionLog): ActionLogData => ({
  trackId,
  timestamp: timestamp.toISO(),
})

interface ActionLogData {
  trackId: string
  timestamp: string
}

export interface ActionLog {
  trackId: string
  timestamp: DateTime
}

export interface PerformanceSet {
  [perfStateMilis: number]: PerformanceData
}

export interface PerformanceData {
  [userId: string]: ViewerData
}

export interface ViewerData {
  [index: string]: ActionLogData
}

export interface Action {
  timestamp: Duration
  trackId: string
  held: Duration
  width: number
}

export interface Performance {
  id: string
  startTime: DateTime
  viewers: Viewer[]
}

export interface Viewer {
  id: string
  actions: Action[]
}

export interface ViewGroup {
  name: string
  views: View[]
}

export interface View {
  label: Label
  actions: Action[]
}

export interface Label {
  text: string
  id: string
}
