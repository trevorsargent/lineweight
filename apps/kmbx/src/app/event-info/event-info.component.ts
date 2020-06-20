import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { ScheduleService, ScheduleItem } from '../services/schedule.service'

@Component({
  selector: 'kmbx-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.scss'],
})
export class EventInfoComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private schedule: ScheduleService,
  ) {}

  event: ScheduleItem

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params)
      this.event = this.schedule.getEvent({
        category: params['category'],
        department: params['department'],
        slug: params['slug'],
      })
    })
  }
}
