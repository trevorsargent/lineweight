import { Component, OnInit, Input } from '@angular/core'
import { ScheduleItem } from '../services/schedule.service'

@Component({
  selector: 'kmbx-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {
  constructor() {}

  @Input()
  listTitle: string

  @Input()
  events: ScheduleItem

  trackByFn(_, item: ScheduleItem) {
    return item.startTime
  }

  distanceFromCenter(index: number, array: []) {
    return Math.floor(array.length / 2) - index + 0.5
  }

  ngOnInit(): void {}
}
