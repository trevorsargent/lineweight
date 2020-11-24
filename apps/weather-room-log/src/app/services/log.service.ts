import { getLocaleMonthNames } from '@angular/common'
import { Injectable } from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/database'

import { DateTime } from 'luxon'
import { Observable } from 'rxjs'

import * as uuid from 'uuid'
import { ScheduleService } from './schedule.service'

@Injectable({ providedIn: 'root' })
export class LogService {
  entries$: Observable<any[]>
  private token: string

  private readonly COLLECTION = 'preview'

  constructor(
    private firestore: AngularFireDatabase,
    private schedule: ScheduleService,
  ) {
    const WR_TOKEN = 'wr-log-id'

    this.token = localStorage.getItem(WR_TOKEN) ?? uuid.v4()
    localStorage.setItem(WR_TOKEN, this.token)
  }

  logAction(trackId: string) {
    this.firestore.list(this.COLLECTION).push({
      trackId,
      event: this.schedule.getCurrentEvent().toISO(),
      timestamp: DateTime.local().toISO(),
      userId: this.token,
    })
  }
}
