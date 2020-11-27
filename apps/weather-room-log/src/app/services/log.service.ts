import { Injectable } from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/database'

import { DateTime, Duration } from 'luxon'
import { Subject } from 'rxjs'

import * as uuid from 'uuid'
import { ScheduleService } from './schedule.service'

@Injectable({ providedIn: 'root' })
export class LogService {
  public performances$: Subject<PerformanceSet>
  private userId: string

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
}

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
