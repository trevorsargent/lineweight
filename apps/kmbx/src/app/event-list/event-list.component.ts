import { Component, OnInit, Input } from '@angular/core'
import { ScheduleItem } from '../app.component'

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

  ngOnInit(): void {}
}
