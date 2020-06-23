import { Component, OnInit } from '@angular/core'
import { ScheduleService, ScheduleItem } from '../services/schedule.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'kmbx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private schedule: ScheduleService) {}

  title = 'kmbx'

  padding = 5

  meats: Observable<ScheduleItem[]>

  ngOnInit(): void {
    this.meats = this.schedule.soonAndRecent(this.padding)
  }
}
