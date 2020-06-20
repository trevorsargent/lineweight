import { Injectable } from '@angular/core'
import { upcomingMeats, recentMeats } from './events'
import { DateTime } from 'luxon'

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor() {}

  upcomingEvents(): ScheduleItem[] {
    return upcomingMeats
  }

  recentEvents(): ScheduleItem[] {
    return recentMeats
  }

  allEvents(): ScheduleItem[] {
    return [...this.upcomingEvents(), ...this.recentEvents()]
  }

  getEvent(args: {
    department: string //
    category: string
    slug: string
  }) {
    return this.allEvents().find(
      (e) =>
        e.category === args.category &&
        e.department === args.department &&
        e.slug === args.slug,
    )
  }
}

export interface ScheduleItem {
  title: string
  blurb: string
  imgSrc: string
  department: string
  category: string
  slug: string
  date: DateTime
  allDay: boolean
  tags: string[]
  icon: string
}
