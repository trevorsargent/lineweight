import { animate, style, transition, trigger } from '@angular/animations'
import { Component, OnInit } from '@angular/core'
import { StateService } from '../../services/state.service'

@Component({
  selector: 'app-down-by-the-river',
  templateUrl: './down-by-the-river.component.html',
  styleUrls: ['./down-by-the-river.component.scss'],
})
export class DownByTheRiverComponent implements OnInit {
  constructor(public state: StateService) {}

  ngOnInit(): void {}

  start() {
    this.state.notifyStarted()
  }
}
