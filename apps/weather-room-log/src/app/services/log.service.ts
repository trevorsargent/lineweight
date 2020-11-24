import { getLocaleMonthNames } from '@angular/common'
import { Injectable } from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/database'

import { DateTime } from 'luxon'
import { Observable, Subject } from 'rxjs'
import { map, timestamp } from 'rxjs/operators'

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
      .ref(this.COLLECTION)
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

interface ActionLog {
  trackId: string
  timestamp: DateTime
}

interface PerformanceSet {
  [perfStateMilis: number]: Performance
}

interface Performance {
  [userId: string]: Viewer
}

interface Viewer {
  [index: string]: ActionLogData
}
