import { Injectable } from '@angular/core'
import { meatEvents, Optionalize } from './events'
import { DateTime, Duration, Interval } from 'luxon'
import { Observable, Subject, interval } from 'rxjs'
import { map, startWith } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor() {}

  soonAndRecent(padding: number): Observable<ScheduleItem[]> {
    const soonAndRecent$ = new Subject<ScheduleItem[]>()

    const all = this.allEvents()

    return interval(1000).pipe(
      startWith(
        all.slice(
          this.findNowIndex(all) - (padding - 1),
          this.findNowIndex(all) + padding,
        ),
      ),
      map((_) => {
        return all.slice(
          this.findNowIndex(all) - (padding - 1),
          this.findNowIndex(all) + padding,
        )
      }),
    )
  }

  getEvent(args: {
    department: string //
    category: string
    slug: string
  }): ScheduleItem {
    return this.setDefaults(
      meatEvents.find(
        (e) =>
          e.category === args.category &&
          e.department === args.department &&
          e.slug === args.slug,
      ),
    )
  }

  allEvents(): ScheduleItem[] {
    const sortedEvents = meatEvents.sort((a, b) =>
      a.startTime.diff(b.startTime).as('seconds'),
    )

    return this.fillEmptySpace(sortedEvents, this.getBackgroundEvent)
  }

  fillEmptySpace(
    events: Optionalize<ScheduleItem, 'duration'>[],
    getBackgroundEvent: (
      time: DateTime,
    ) => Optionalize<ScheduleItem, 'duration'>,
  ): ScheduleItem[] {
    return events.reduce(
      (
        previous: ScheduleItem[],
        current: Optionalize<ScheduleItem, 'duration'>,
      ) => {
        const lastEvent = previous.slice(-1)[0]

        if (!lastEvent) {
          return [this.setDefaults(current)]
        }

        const lastDuration = this.setDefaults(lastEvent).duration

        const lastEnd = lastEvent.startTime.plus(lastDuration)
        const fillDuration = current.startTime.diff(lastEnd)
        if (Math.abs(fillDuration.as('seconds')) < 10) {
          return [...previous, this.setDefaults(current)]
        }

        const filler: ScheduleItem = {
          duration: fillDuration,
          ...getBackgroundEvent(lastEnd),
        }

        return [...previous, filler, this.setDefaults(current)]
      },
      [],
    )
  }

  getBackgroundEvent(time: DateTime): Optionalize<ScheduleItem, 'duration'> {
    return {
      blurb: 'SmoothJazz, All The Time',
      category: 'live',
      department: 'radio',
      startTime: time,
      icon: 'speaker',
      slug: 'live',
      title: 'Regularly Scheduled Programming',
    }
  }

  findNowIndex(events: ScheduleItem[]) {
    return events.findIndex((event) =>
      Interval.after(event.startTime, event.duration).contains(
        DateTime.fromObject({}),
      ),
    )
  }
  setDefaults(event: Optionalize<ScheduleItem, 'duration'>): ScheduleItem {
    return {
      duration: Duration.fromObject({ hours: 1 }),
      ...event,
    }
  }
}

export interface ScheduleItem {
  title: string
  blurb: string
  department: string
  category: string
  slug: string
  startTime: DateTime
  duration: Duration // assumed to be an hour
  icon: string
}
