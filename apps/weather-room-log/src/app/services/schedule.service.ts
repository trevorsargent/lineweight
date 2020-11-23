import { getLocaleDateTimeFormat } from '@angular/common'
import { Injectable } from '@angular/core'
import { DateTime, Duration } from 'luxon'

@Injectable({ providedIn: 'root' })
export class ScheduleService {
  public readonly EVENT_DURATION: Duration = Duration.fromObject({
    minutes: 23,
    seconds: 52,
  })

  private contantInfo = {
    hour: 19,
    minute: 30,
  }

  private opening: DateTime = DateTime.fromObject({
    year: 2020,
    month: 11,
    day: 26,
    ...this.contantInfo,
  })

  private today: DateTime = DateTime.fromObject({
    ...this.contantInfo,
    hour: 13,
    minute: 30,
  })

  private events: Schedule = [this.today, this.opening]

  getNextEvent(): DateTime {
    return this.events
      .sort((a, b) => a.diff(b).valueOf())
      .find((a) => a.diffNow().as('milliseconds') > 0)
  }

  private getCurrentEvent(): DateTime {
    return this.events
      .sort((a, b) => a.diff(b).valueOf())
      .find((a) => {
        const diffNow = a?.diffNow().as('seconds')
        return (
          diffNow < 0 && Math.abs(diffNow) < this.EVENT_DURATION.as('seconds')
        )
      })
  }

  getCurrentEventTimeCode(): number | undefined {
    return Math.abs(this.getCurrentEvent()?.diffNow().as('seconds'))
  }
}

export type Schedule = DateTime[]
