import { Injectable } from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/database'

import { DateTime, Duration } from 'luxon'
import { Observable, Subject } from 'rxjs'
import { map } from 'rxjs/operators'

import * as uuid from 'uuid'
import { ScheduleService } from './schedule.service'

import faker from 'faker'

@Injectable({ providedIn: 'root' })
export class LogService {
  public performances$: Subject<PerformanceSet>
  private userId: string

  names = new Map<string, string>()

  private readonly COLLECTION = 'dev'

  constructor(
    private firestore: AngularFireDatabase,
    private schedule: ScheduleService,
  ) {
    const WR_TOKEN = 'wr-log-id'

    this.userId = localStorage.getItem(WR_TOKEN) ?? uuid.v4()
    localStorage.setItem(WR_TOKEN, this.userId)
    this.performances$ = new Subject()

    this.firestore.database
      // .ref(this.COLLECTION)
      .ref('preview')
      .on('value', (snap) => this.performances$.next(snap.val()))
  }

  getPerformances$(): Observable<Performance[]> {
    return this.performances$.pipe(
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
                        this.schedule.PERFORMANCE_DURATION.as('milliseconds')) *
                        100 ?? undefined,
                  })),
              }),
            ),
          }),
        )
      }),
    )
  }

  getVisits$(viewerId: string): Observable<ViewHistory> {
    return this.getPerformances$().pipe(
      map(
        (perfs: Performance[]): ViewHistory => ({
          id: viewerId,
          name: this.getAndCacheName(viewerId),
          viewings: perfs.map((performance) => ({
            id: performance.id,
            startTime: performance.startTime,
            actions: performance.viewers.find((v) => v.id === viewerId).actions,
          })),
        }),
      ),
    )
  }

  logAction(trackId: string) {
    const action: ActionLog = {
      trackId,
      timestamp: DateTime.local(),
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
  name: string
  actions: Action[]
}

export interface ViewHistory extends Pick<Viewer, 'id' | 'name'> {
  viewings: Viewing[]
}

export interface Viewing extends Pick<Performance, 'id' | 'startTime'> {
  actions: Action[]
}
