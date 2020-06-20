import { Component, OnInit } from '@angular/core'
import { ScheduleService, ScheduleItem } from '../services/schedule.service'

@Component({
  selector: 'kmbx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private schedule: ScheduleService) {}

  title = 'kmbx'

  upcomingMeats: ScheduleItem[]
  recentEvents: ScheduleItem[]

  ngOnInit(): void {
    this.upcomingMeats = this.schedule.upcomingEvents()
    this.recentEvents = this.schedule.recentEvents()
  }
}
