import { animate, style, transition, trigger } from '@angular/animations'
import { Component, OnInit } from '@angular/core'
import { StateService } from '../../services/state.service'

@Component({
  selector: 'app-down-by-the-river',
  templateUrl: './down-by-the-river.component.html',
  styleUrls: ['./down-by-the-river.component.scss'],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1000ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('1000ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class DownByTheRiverComponent implements OnInit {
  constructor(public state: StateService) {}

  ngOnInit(): void {}

  start() {
    this.state.notifyStarted()
  }
}
