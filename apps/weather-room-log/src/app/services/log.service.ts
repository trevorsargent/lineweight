import { getLocaleMonthNames } from '@angular/common'
import { Injectable } from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/database'

import { DateTime } from 'luxon'
import { Observable } from 'rxjs'
import { map, timestamp } from 'rxjs/operators'

import * as uuid from 'uuid'
import { ScheduleService } from './schedule.service'

@Injectable({ providedIn: 'root' })
export class LogService {
  public actions$: Observable<ActionLog[]>
  private userId: string

  private readonly COLLECTION = 'dev'

  constructor(
    private firestore: AngularFireDatabase,
    private schedule: ScheduleService,
  ) {
    const WR_TOKEN = 'wr-log-id'

    this.userId = localStorage.getItem(WR_TOKEN) ?? uuid.v4()
    localStorage.setItem(WR_TOKEN, this.userId)
    this.actions$ = this.firestore
      .list(this.COLLECTION)
      .valueChanges()
      .pipe(map((x: ActionLogData[]) => x.map(dataToAction)))
  }

  logAction(trackId: string) {
    const action: ActionLog = {
      trackId,
      event: this.schedule.getCurrentEvent(),
      timestamp: DateTime.local(),
      userId: this.userId,
    }

    this.firestore.list(this.COLLECTION).push(actionToData(action))
  }
}

const actionToData = ({
  event,
  timestamp,
  trackId,
  userId,
}: ActionLog): ActionLogData => ({
  userId,
  trackId,
  timestamp: timestamp.toISO(),
  event: event.toISO(),
})

const dataToAction = ({
  event,
  timestamp,
  userId,
  trackId,
}: ActionLogData): ActionLog => ({
  trackId,
  userId,
  timestamp: DateTime.fromISO(timestamp),
  event: DateTime.fromISO(event),
})

export interface ActionLogData {
  trackId: string
  event: string
  timestamp: string
  userId: string
}

export interface ActionLog {
  trackId: string
  event: DateTime
  timestamp: DateTime
  userId: string
}
